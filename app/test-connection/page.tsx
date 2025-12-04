'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

export default function TestConnection() {
  const [status, setStatus] = useState<string>('Testing...');
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        // Test 1: Check if client is initialized
        if (!supabase) {
          setStatus('❌ Supabase client not initialized');
          return;
        }
        
        setStatus('✅ Supabase client initialized');

        // Test 2: Try to query the table
        const { data, error, count } = await supabase
          .from('ghost_sightings')
          .select('*', { count: 'exact', head: true });

        if (error) {
          setStatus('❌ Error connecting to database');
          setDetails({
            error: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
          });
          return;
        }

        setStatus(`✅ Successfully connected! Found ${count || 0} records in database`);
        setDetails({ count, connectionSuccess: true });

      } catch (err: any) {
        setStatus('❌ Unexpected error');
        setDetails({ error: err.message, stack: err.stack });
      }
    }

    testConnection();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-8">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Supabase Connection Test
        </h1>
        
        <div className="bg-zinc-900 border-2 border-zinc-700 rounded-xl p-8 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Status:</h2>
          <p className="text-lg text-zinc-300">{status}</p>
        </div>

        {details && (
          <div className="bg-zinc-900 border-2 border-zinc-700 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-white mb-4">Details:</h2>
            <pre className="text-sm text-zinc-300 overflow-auto">
              {JSON.stringify(details, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 text-center">
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors"
          >
            Back to Home
          </a>
        </div>

        <div className="mt-8 bg-zinc-900 border-2 border-zinc-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Environment Variables Check:</h3>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>
              NEXT_PUBLIC_SUPABASE_URL: {' '}
              <span className={process.env.NEXT_PUBLIC_SUPABASE_URL ? 'text-green-400' : 'text-red-400'}>
                {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Set' : '✗ Missing'}
              </span>
            </li>
            <li>
              NEXT_PUBLIC_SUPABASE_ANON_KEY: {' '}
              <span className={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'text-green-400' : 'text-red-400'}>
                {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing'}
              </span>
            </li>
          </ul>
          
          {process.env.NEXT_PUBLIC_SUPABASE_URL && (
            <p className="mt-4 text-xs text-zinc-500 break-all">
              URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}
            </p>
          )}
        </div>

        <div className="mt-6 bg-blue-900/30 border-2 border-blue-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-300 mb-3">Next Steps if Failing:</h3>
          <ol className="space-y-2 text-sm text-blue-200 list-decimal list-inside">
            <li>Make sure you created the <code className="bg-black px-2 py-1 rounded">ghost_sightings</code> table in Supabase</li>
            <li>Check your <code className="bg-black px-2 py-1 rounded">.env.local</code> file has correct values</li>
            <li>Verify Row Level Security (RLS) policies allow public SELECT access</li>
            <li>Restart your dev server after changing environment variables</li>
            <li>See <code className="bg-black px-2 py-1 rounded">SUPABASE_SETUP.md</code> for detailed instructions</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

