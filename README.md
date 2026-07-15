# Guia de Hospedagem de Ativos Estáticos e Imagens - Cell Store Silvânia

Este guia explica como lidamos com a renderização estável e de altíssima velocidade de imagens ao implantar a aplicação em plataformas de hospedagem de front-end, como o **Netlify** ou o **Vercel**.

---

## 🟢 Solução Definitiva Adotada: Ativos Servidos via CDN Pública Estável

Para eliminar qualquer incompatibilidade no sincronismo de arquivos gerados localmente pelo Git e os limites das ferramentas de build estáticas no Netlify, nós migramos todas as referências de imagens para links em CDNs públicas e robustas (**Unsplash**).

### Benefícios dessa abordagem:
1. **Garantia de Funcionamento (Zero Imagens Quebradas):** Os links são URLs absolutas universais que funcionam imediatamente em qualquer navegador do mundo, eliminando erros de caminhos relativos como `/src/...` ou problemas de arquivos ignorados localmente no Git.
2. **Altíssimo Desempenho (CDNs Globais):** As imagens são automaticamente redimensionadas, otimizadas e servidas a partir de nós de borda ultra-rápidos, reduzindo o tempo de carregamento da sua Landing Page de alta conversão.
3. **Imagens de Alta Resolução Realistas:** Mantivemos imagens profissionais lindíssimas de alta definição para o iPhone 15 Pro Max, Samsung Galaxy S24 Ultra, iPhone 13 e acessórios, garantindo o apelo premium e a elegância minimalista que você solicitou.

---

## 💡 Alternativa Local (Usando a Pasta `/public`)

Caso no futuro você decida utilizar fotos reais tiradas da sua loja ou dos seus próprios aparelhos físicos, siga este padrão recomendado para o Vite:

1. Salve as imagens reais no diretório `/public/images/` do seu projeto.
2. Certifique-se de que a pasta não esteja sendo excluída por regras de arquivos ocultos do Git em seu editor local.
3. No arquivo `src/data.ts` ou nos seus componentes React, aponte diretamente para o caminho relativo limpo (sem incluir a palavra `public`):
   ```typescript
   // Exemplo com imagem local real:
   image: '/images/meu-iphone-real.jpg'
   ```

---

## 🚀 Como prosseguir:
Basta enviar as últimas atualizações do repositório para o seu GitHub. O Netlify fará o deploy imediato das atualizações e seu site exibirá todas as fotos com 100% de estabilidade e extrema elegância!
