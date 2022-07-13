<template>
	<div class="product">
    <HeaderShayna/>
     <!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section text-left">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb-text product-more">
                        <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
                        <span>Detail</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb Section Begin -->

    <!-- Product Shop Section Begin -->
    <section class="product-shop spad page-details">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="product-pic-zoom">
                                <img class="product-big-img" :src="gambar_default" alt="" />
                            </div>
                            <div class="product-thumbs" v-if="product.galleries">
                                <carousel :dots="false" :nav="false"  class="product-thumbs-track ps-slider">
                                    <div v-for="itemGallery in product.galleries" :key="itemGallery.id">
                                        <div :class="itemGallery.photo == gambar_default ? 'pt active' : 'pt' " :data-imgbigurl="itemGallery.photo" >
                                            <img :src="itemGallery.photo" alt="" @click="changeImage(itemGallery.photo)" />
                                        </div>
                                    </div>
                                </carousel>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="product-details text-left">
                                <div class="pd-title">
                                    <span>{{ product.type }}</span>
                                    <h3>{{ product.name }}</h3>
                                </div>
                                <div class="pd-desc">
                                    <p>
                                        {{ product.description }}
                                    </p>
                                    
                                    <h4>${{ product.price }}</h4>
                                </div>
                                <div class="quantity">
                                    <router-link to="/cart">
                                        <a href="#" @click="addCart(product.id, product.name, product.price, product.galleries[0].photo)" class="primary-btn pd-cart">Add To Cart </a>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Product Shop Section End -->

    <RelatedProduct/>
	<FooterShayna/>
	</div>
</template>

<script>
// @ is an alias to /src
import HeaderShayna from "@/components/HeaderShayna.vue";
import FooterShayna from "@/components/FooterShayna.vue";
import RelatedProduct from "@/components/RelatedProduct.vue";
import carousel from 'vue-owl-carousel'
import axios from "axios";

export default {
	name: "ProductView",
	components: {
	HeaderShayna,
    RelatedProduct,
	FooterShayna,
    carousel
	},
    data() {
        return {
            gambar_default: "",
            product: [],
            product_id: this.$route.params.id,
            cart: [],
        }
    },
    methods: {
        changeImage(img) {
            this.gambar_default = img;
        },
        setDataPicture(data){
            this.product = data;
            this.gambar_default = data.galleries[0].photo;
        },
        addCart(idProduct, productName, productPrice, productPhoto){
            var productStored = {
                "id": idProduct,
                "name": productName,
                "price": productPrice,
                "photo": productPhoto,
            }
            this.$store.commit('addCart', productStored);
        }
    },
    mounted(){
        this.cart = this.$store.state.carts;
        axios.get(`http://shayna-backend.local/api/products`,{
            params: {
                id: this.product_id
            }
        })
        .then(res => {
            // this.product = res.data.data
            this.setDataPicture(res.data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
};
</script>

<style scoped>
.product-thumbs .pt{
    margin-right: 14px;
}
</style>
