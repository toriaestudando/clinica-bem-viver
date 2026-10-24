# Clínica Bem Viver — protótipo PWA

Site demonstrativo responsivo para uma clínica fictícia, com identidade visual azul-marinho, azul suave, branco perolado e champagne.

## Arquivos
- `index.html`: estrutura e telas do site.
- `styles.css`: identidade visual e responsividade.
- `app.js`: menu, modais, validação e fluxos de demonstração.
- `manifest.json`: metadados para instalação como PWA.
- `service-worker.js`: cache básico do app shell.
- `assets/icon.svg`: ícone vetorial.

## Publicar no GitHub Pages
1. Crie um repositório público.
2. Envie todos os arquivos e a pasta `assets` para a raiz do repositório, preservando a estrutura.
3. No repositório, abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/(root)`, depois salve.
6. Aguarde o GitHub Pages publicar. O Service Worker/PWA precisa ser servido por HTTPS (o GitHub Pages fornece HTTPS quando habilitado).

## Limitações importantes
Este é somente um protótipo de interface:
- Não existe cadastro, login ou autenticação real.
- O formulário de consulta registra apenas dados demonstrativos no `localStorage` do navegador; não envia pedidos à clínica.
- Não há banco de dados, agenda real, notificações push, prontuário, teleconsulta nem painel administrativo.
- Não armazene dados reais de saúde, dados de crianças, informações de gestação, senhas ou documentos neste protótipo.
- Os dados de contato e serviços são ilustrativos e devem ser substituídos antes de qualquer divulgação.

## Antes de usar com pacientes reais
Implemente backend seguro e autenticação (por exemplo, Supabase Auth), banco de dados com políticas de acesso por usuário, autorização de responsáveis, registros de auditoria, controle de sessões, consentimento adequado, política de privacidade e avaliação de segurança/LGPD. Dados de saúde e de crianças exigem proteção reforçada. A agenda precisa de disponibilidade real e regras de confirmação/cancelamento. Push notifications exigem configuração adicional. O PWA não substitui atendimento médico ou serviço de emergência.
