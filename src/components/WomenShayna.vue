<template>
    <!-- Women Banner Section Begin -->
    <section class="women-banner spad">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 mt-5" v-if="products.length > 0">
                    <carousel class="product-slider" :items="3" :nav="false" :autoplay="true" :dots="false">
                        <div class="product-item" v-for="product in products" v-bind:key="product.id">
                            <div class="pi-pic">
                                <img :src="product.galleries[0].photo" alt="" />
                                <ul>
                                    <li class="w-icon active">
                                        <a style="cursor: pointer;" @click="addCart(product.id, product.name, product.price, product.galleries[0].photo)"><i class="icon_bag_alt"></i></a>
                                    </li>
                                    <li class="quick-view">                                
                                        <router-link :to="'/product/'+product.id">+ Quick View</router-link>
                                    </li>
                                </ul>
                            </div>
                            <div class="pi-text">
                                <div class="catagory-name">{{ product.type }}</div>
                                <router-link :to="'/product/'+product.id">
                                    <h5>{{ product.name }}</h5>
                                </router-link>
                                <div class="product-price">
                                    ${{ product.price }}
                                </div>
                            </div>
                        </div>
                    </carousel>
                </div>
                <div class="col-lg-12" v-else>
                    <p>Produk belum tersedia.</p>
                </div>
            </div>
        </div>
    </section>
    <!-- Women Banner Section End -->
</template>
<script>
import carousel from 'vue-owl-carousel'
import axios from 'axios'
export default {
    name: "WomenShayna",
    components: {
        carousel
    },
    data(){
        return{
            products: [],
            cart:[],
        }
    },
    methods:{
        addCart(id, name, price, photo){
            this.cart = {
                id: id,
                name: name,
                price: price,
                photo: photo
            }
            this.$store.commit('addCart', this.cart);
        },
    },
    mounted(){
        axios.get(`http://shayna-backend.local/api/products`)
        .then(res => {
            this.products = res.data.data.data
        })
    }
}
</script>
<style scoped>
.product-item{
    margin-right: 25px;
}
</style>