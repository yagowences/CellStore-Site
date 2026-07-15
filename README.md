# Guia de Hospedagem de Ativos Estáticos e Imagens - Cell Store Silvânia

Este guia explica detalhadamente por que imagens referenciadas com caminhos dinâmicos relativos à pasta `/src` (ex: `/src/assets/images/foto.jpg`) podem aparecer quebradas quando publicadas em servidores de hospedagem estática como o **Netlify**, **Vercel** ou **GitHub Pages**, e como corrigir isso utilizando a pasta `/public` ou links públicos acessíveis na web.

---

## 🛑 O Problema: Caminhos `/src/...` quebrados em Produção

Durante o desenvolvimento local com o Vite, o servidor consegue servir arquivos diretamente da pasta `/src`. No entanto, quando você roda o build de produção (`npm run build`):

1. **Vite não rastreia strings puras:** Se você tiver um caminho de imagem como string em um arquivo TypeScript/JavaScript (por exemplo, no seu `src/data.ts`):
   ```typescript
   // ❌ ISSO QUEBRA EM PRODUÇÃO!
   image: '/src/assets/images/meu-celular.jpg'
   ```
   O empacotador (Vite) não sabe que precisa incluir essa imagem no pacote final, porque ela está declarada como uma mera string de texto e não como um `import` de módulo oficial do ES.
2. **Nova Estrutura de Pastas:** Os arquivos compilados de `/src` vão para uma pasta de distribuição (geralmente `/dist`), enquanto as pastas de origem `/src` não são enviadas ao servidor final. Portanto, o caminho `/src/assets/...` simplesmente deixa de existir na hospedagem.

---

## 🟢 A Solução 1: A Pasta `/public` (Recomendado para Ativos Locais)

A pasta `/public` no diretório raiz do seu projeto foi projetada especificamente para servir ativos estáticos sem passar pelo processo de compilação do Vite.

### Como funciona:
Tudo o que for colocado dentro de `/public` será copiado **exatamente como está** para a raiz da pasta de distribuição final (`/dist`) no momento do build.

### Passo a Passo para usar:
1. Crie uma pasta chamada `images` dentro do diretório `/public` (caminho: `/public/images/`).
2. Mova todas as suas imagens para lá (ex: `/public/images/celular.jpg`).
3. No seu código (por exemplo, no arquivo `src/data.ts`), mude a referência para começar diretamente da raiz do servidor:
   ```typescript
   // ✅ ISSO FUNCIONA PERFEITAMENTE EM QUALQUER HOSPEDAGEM (Netlify, Vercel, etc.)!
   image: '/images/celular.jpg'
   ```
   *Nota: Nunca inclua o termo `/public` no caminho final do seu código. O conteúdo de `/public` é montado na raiz do servidor.*

---

## 🔵 A Solução 2: Links Públicos Acessíveis na Web

Se você preferir não carregar as imagens diretamente no seu repositório Git ou se precisar que os ativos sejam carregados de um servidor CDN dedicado, você pode usar URLs absolutas completas:

```typescript
// ✅ TOTALMENTE INDEPENDENTE DA HOSPEDAGEM!
image: 'https://sua-cdn.com/images/celular.jpg'
```

### O que nós fizemos no projeto:
Para garantir que seu site funcione de imediato e com 100% de estabilidade ao ser publicado no Netlify, nós:
1. **Criamos** o diretório `/public/images/`.
2. **Copiamos** todas as imagens de demonstração geradas para essa pasta.
3. **Atualizamos** todas as referências no arquivo `src/data.ts` e `src/App.tsx` para utilizarem o caminho limpo e canônico de produção (ex: `/images/iphone15_gold_...`).
4. Agora, as imagens são servidas diretamente da raiz, garantindo resolução perfeita na hospedagem estática e zero links quebrados no Netlify!

---

## 🚀 Como testar e publicar novamente:

1. Salve as alterações e envie o código para o seu repositório no GitHub.
2. O Netlify detectará a alteração e iniciará o deploy automaticamente.
3. Acesse a URL do Netlify e veja todos os celulares, acessórios e mapas renderizando em altíssima definição com carregamento instantâneo!
