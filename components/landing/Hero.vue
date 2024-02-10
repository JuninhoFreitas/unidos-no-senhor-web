<template>
  <main class="grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-8">
    <div class="p-24 md:order-1 hidden md:block">
      <img
        class="rounded-full transition-transform transform hover:scale-125"
        src="~/assets/img/logo.png"
        alt="Starship starts the engine"
        loading="eager"
        format="avif"
        width="400"
        height="400"
      />
    </div>

    <div>
      <h1 class="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight">Igreja Bíblica Unidos no Senhor</h1>
      <p class="text-lg mt-4 text-slate-600 max-w-xl">
        Amando a Deus e as pessoas<br />
        Servindo a Deus e as pessoas.
      </p>
      <div class="mt-6 flex flex-col sm:flex-row gap-3">
        <LandingLink href="/membros/cadastro" target="_blank" rel="noopener">Membros</LandingLink>
        <LandingLink size="lg" styleName="outline" rel="noopener" href="/biblioteca/cadastro" target="_blank">Biblioteca</LandingLink>
        <LandingLink size="lg" styleName="outline" rel="noopener" href="/biblioteca/cadastro" target="_blank">Registrar Livros</LandingLink>
      </div>
    </div>
  </main>
</template>
