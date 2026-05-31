import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  const json = (body: object, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return json({ error: 'Missing authorization header' }, 401)

    // Verify caller using their JWT
    const callerClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )
    const { data: { user }, error: authErr } = await callerClient.auth.getUser()
    if (authErr || !user) return json({ error: 'Invalid session' }, 401)

    // Confirm caller is admin
    const { data: roleRow } = await callerClient
      .from('user_roles')
      .select('role')
      .eq('email', user.email)
      .single()
    if (roleRow?.role !== 'admin') return json({ error: 'Forbidden — admin only' }, 403)

    const { email, password, role } = await req.json()
    if (!email || !password || !role) return json({ error: 'email, password, and role are required' }, 400)

    // Use service role key to create the user
    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { error: createErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })
    if (createErr) return json({ error: createErr.message }, 400)

    // Upsert role (handles re-adding an existing user)
    const { error: roleErr } = await admin
      .from('user_roles')
      .upsert({ email, role }, { onConflict: 'email' })
    if (roleErr) return json({ error: 'User created but role save failed: ' + roleErr.message }, 500)

    return json({ success: true })
  } catch (err) {
    return json({ error: (err as Error).message }, 500)
  }
})
