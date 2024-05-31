<script setup>
definePageMeta({
  layout: 'landing',
});
useHead({
  title: 'Unidos no Senhor | Sobre Nós',
});
const PrTiagoW =
  'https://static.wixstatic.com/media/f6cfc7_ec84b04cf4a44a2593636a0157e6800e~mv2.jpg/v1/fill/w_329,h_329,al_c,lg_1,q_80,enc_auto/f6cfc7_ec84b04cf4a44a2593636a0157e6800e~mv2.jpg';
const PrGilberto =
  'https://static.wixstatic.com/media/f6cfc7_22644322b51d4301b91d409aefc3c3a5~mv2.jpg/v1/fill/w_330,h_329,al_c,lg_1,q_80,enc_auto/f6cfc7_22644322b51d4301b91d409aefc3c3a5~mv2.jpg';
const PrThiagoDaMata = 'https://i.imgur.com/9cTA5kf.png';

const team = [
  {
    name: 'Tiago Wagner',
    title: 'Pastor',
    avatar: {
      src: PrTiagoW,
      width: 580,
      height: 580,
    },
  },
  {
    name: 'Gilberto da Silva',
    title: 'Pastor',
    avatar: {
      src: PrGilberto,
      width: 580,
      height: 580,
    },
  },
  {
    name: 'Thiago da Mata',
    title: 'Pastor',
    avatar: {
      src: PrThiagoDaMata,
      width: 580,
      height: 580,
    },
  },
];
</script>

<template>
  <LandingContainer>
    <LandingSectionhead>
      <template v-slot:title>Quem Somos?</template>
      <template v-slot:desc>Uma Igreja preocupada em manter a sã doutrina e ser uma comunidade amorosa.</template>
    </LandingSectionhead>

    <div class="flex flex-col whitespace-break-spaces gap-3 mx-auto max-w-4xl mt-16">
      <h2 class="font-bold text-3xl text-black">Nossa História</h2>
      <p class="text-lg leading-loose font-sans text-black">
        A Igreja Bíblica Unidos no Senhor foi fundada em 1980 por um grupo de jovens cristãos que tinha duas preocupações principais: manter
        a sã doutrina e ser uma comunidade amorosa. <br />E foi com estes princípios sempre em mente que nossa igreja cresceu, e hoje não se
        reúne mais na pequena sala alugada no Centro da cidade. <br /><br />Com a preocupação de levar a mensagem da verdade para as pessoas
        e transmiti-las no contexto de mundo atual, considerando-as dentro da sua cultura e individualidade, temos nos reinventado a cada
        dia, buscando conhecer as pessoas, para que possam não somente ser apoiadas (pastoreadas), mas também que sirvam a Cristo,
        utilizando seus dons e talentos. <br /><br />Este é o motivo pelo qual fazemos o que fazemos. Em outras palavras, pode-se dizer que
        o nosso grande objetivo é proclamar o Evangelho, sendo uma comunidade amorosa, conduzindo pessoas a Cristo através de
        relacionamentos pessoais, acolhendo-as na família da fé e discipulando-as para a maturidade! <br /><br />Desde 1980 muitas coisas
        mudaram no Brasil e no mundo, assim como na própria Unidos. As pessoas de hoje agem e pensam diferente. Mas isto certamente não
        mudou: o nosso zelo pela sã doutrina e o nosso amor pelas pessoas.

        <br /><br />Se deseja conhecer-nos melhor, navegue em nosso site, agende uma visita ou apareça em alguma de nossas reuniões ou
        cultos semanais.
        <!-- Bold text -->
        <span> </span>
      </p>
      <h1 class="mx-auto mt-3 text-2xl">
        <strong> Você é nosso convidado! </strong>
      </h1>
    </div>
    <div class="flex flex-col gap-3 mx-auto max-w-4xl mt-16">
      <h2 class="font-bold text-3xl text-gray-800">Forma de Governo</h2>
      <p class="text-lg leading-relaxed text-slate-900">
        Cremos que a igreja local possui autoridade e autonomia para tomar suas próprias decisões.<br />
        A autoridade máxima em nossa igreja é dada pela Assembléia reunida (reunião anual com a participação de todos os membros da igreja
        local).
        <br /><br />
        A condução das assembleias é dada pelo presbitério, que é escolhido pela própria Igreja, em assembléia.
        <br />
        O presbitério reúne-se a semanalmente para tratar questões ligadas à igreja, sejam elas de âmbito legal, espiritual, patrimonial,
        etc.
      </p>
    </div>
    <div class="grid md:grid-cols-3 gap-10 mx-auto max-w-4xl mt-12 pb-24">
      <div v-for="item of team" class="group">
        <div class="w-full aspect-square">
          <img
            :src="item.avatar.src"
            :width="item.avatar.width"
            :height="item.avatar.height"
            format="avif"
            alt="Team"
            class="w-full h-full object-cover rounded transition group-hover:-translate-y-1 group-hover:shadow-xl"
          />
        </div>

        <div class="mt-4 text-center">
          <h2 class="text-lg text-gray-800">{{ item.name }}</h2>
          <h3 class="text-sm text-slate-500">{{ item.title }}</h3>
        </div>
      </div>
    </div>
  </LandingContainer>
</template>
