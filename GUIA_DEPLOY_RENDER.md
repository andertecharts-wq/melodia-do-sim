# 🚀 Como Colocar o Painel Admin Online (Render.com)

## Passo 1: Criar Conta no Render (2 minutos)

1. Acesse: https://render.com/
2. Clique em "Get Started for Free"
3. Escolha "Sign up with GitHub"
4. Autorize o Render a acessar seu GitHub

## Passo 2: Criar Novo Web Service (3 minutos)

1. No painel do Render, clique em "New +"
2. Selecione "Web Service"
3. Conecte seu repositório do GitHub:
   - Procure por: `melodia-do-sim` ou `wedding_music_lp`
   - Clique em "Connect"

## Passo 3: Configurar o Serviço

Preencha os campos:

- **Name:** `melodia-do-sim-backend`
- **Region:** `Oregon (US West)` (ou mais próximo)
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Instance Type:** `Free`

## Passo 4: Deploy!

1. Clique em "Create Web Service"
2. Aguarde 2-3 minutos (vai aparecer "Deploy in progress...")
3. Quando aparecer "Live", está pronto! ✅

## Passo 5: Pegar a URL do seu painel

1. No topo da página, você verá uma URL tipo:
   ```
   https://melodia-do-sim-backend.onrender.com
   ```

2. Seu painel admin estará em:
   ```
   https://melodia-do-sim-backend.onrender.com/login.html
   ```

## ✅ Pronto!

Agora você pode:
- Acessar o painel de qualquer lugar
- Não precisa deixar o PC ligado
- O painel fica online 24/7

## 🔐 Login

- **Usuário:** admin
- **Senha:** melodia2025

## ⚠️ Importante

- O plano gratuito pode ficar "dormindo" após 15 minutos sem uso
- Ao acessar novamente, pode demorar 30 segundos para "acordar"
- É totalmente normal e gratuito!

## 📝 Próximo Passo

Depois que estiver online, me avise que vou atualizar o site para usar a nova URL!
