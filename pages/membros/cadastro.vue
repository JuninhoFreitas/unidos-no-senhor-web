<script setup>
definePageMeta({
  layout: "landing",
  middleware: "auth",
});
/** 
 * In the top of the page should have a title "Cadastro de Membros"
 * Above the form should have 3 cards with the following information:
 * - Total de Membros
 * - Membros Ativos
 * - Membros Inativos
 * 
 * The page should have a button to list all members
 * The page should have a button to list all members that are active
 * The page should have a button to list all members that are inactive
 * 
 * The page should have a left menu with the following options:
 * - Pagina Inicial
 * - Biblioteca
 * - Membros
 *   - Cadastro
 *   - Listagem
 * This menu should be hidden in mobile
 * 
 * 
 * **/


</script>

<template>
  <LandingContainer>
    <LandingSectionhead>
      <template v-slot:title>Cadastro de Membros</template>
    </LandingSectionhead>
    <LandingForm>
      <LandingCard>
        <template v-slot:title>Total de Membros</template>
        <template v-slot:content>100</template>
      </LandingCard>
      <LandingCard>
        <template v-slot:title>Membros Ativos</template>
        <template v-slot:content>80</template>
      </LandingCard>
      <LandingCard>
        <template v-slot:title>Membros Inativos</template>
        <template v-slot:content>20</template>
      </LandingCard>
      <MemberRegisterMember></MemberRegisterMember>
    </LandingForm>
  </LandingContainer>
</template>
