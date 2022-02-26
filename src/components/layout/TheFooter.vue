<template>
    <div class="wrapper-footer">
        <div class="footer-col">
            <h3>Sobre nós</h3>
            <a href="https://www.abcbrasil.com.br/quem-somos/" target="_blank">
                <p>Banco ABC Brasil</p>
            </a>
        </div>
        <div class="footer-col">
            <h3>SAC</h3>
            <p>0800 724 74 11</p>
        </div>
        <div class="footer-col">
            <h3>Ouvidoria</h3>
            <p>800-725-7595</p>
        </div>
        <div class="footer-col">
            <h3>Localização</h3>
            <p>Avenida Cidade Jardim, 803 – 2º andar Itaim Bibi –
                São Paulo-SP – 01453-000 CNPJ: 28.195.667/0001-06</p>
        </div>
    </div>
</template>

<script lang="ts">
import { theme } from '@/config/styles'

export default {
    name: 'TheFooter',
    setup() {
        return {
            theme
        }
    }
}
</script>

<style scoped>
.wrapper-footer {
    width: calc(100% - 60px);
    padding: 40px 30px 10px 30px;
    background-color: v-bind('theme.colors.black');
    margin-left: 0;
    margin-right: 0;
    color: v-bind('theme.colors.white');
    display: flex;
    text-align: left;
    flex-direction: column;
}
.footer-col {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
}
p {
    font-size: 14px;
    font-weight: 300;
}

a {
    text-decoration: none;
    color: v-bind('theme.colors.white');
}

p:hover {
    text-decoration: underline;
}
@media (min-width: 768px) {
    .wrapper-footer {
        flex-direction: row;
    }
    .footer-col {
        width: 25%;
        text-align: left;
    }
}
</style>