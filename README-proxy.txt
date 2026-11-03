Proxy OpenAlex (api/openalex/[...path].js)
1. Suba a pasta "api" inteira para a raiz do repositorio (junto com o index.html).
2. Crie uma chave gratuita em https://openalex.org/settings/api (login com e-mail).
3. Na Vercel: projeto > Settings > Environment Variables > adicione
   OPENALEX_API_KEY = (a chave), em Production e Preview.
4. Faca um novo deploy (Deployments > Redeploy) para a variavel valer.
Sem a chave o proxy funciona, mas com o limite gratuito por IP (100 creditos/dia).
