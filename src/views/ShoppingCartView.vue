<template>
    <div class="cart text-left">
        <HeaderShayna/>
        <!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section text-left">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb-text product-more">
                        <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
                        <span>Shopping Cart</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb Section Begin -->

    <!-- Shopping Cart Section Begin -->
    <section class="shopping-cart spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="cart-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th class="p-name text-center">Product Name</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in cart" :key="item.index">
                                            <td class="cart-pic first-row">
                                                <img :src="item.photo" />
                                            </td>
                                            <td class="cart-title first-row text-center">
                                                <h5>{{ item.name }}</h5>
                                            </td>
                                            <td class="p-price first-row">${{ item.price }}</td>
                                            <td class="delete-item"><a href="#" @click="removeItem(item.index)"><i class="material-icons">
                                              close
                                              </i></a>
                                              </td>
                                        </tr>=
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <h4 class="mb-4">
                                Informasi Pembeli:
                            </h4>
                            <div class="user-checkout">
                                <form>
                                    <div class="form-group">
                                        <label for="namaLengkap">Nama lengkap</label>
                                        <input type="text" class="form-control" v-model="customerInfo.name" id="namaLengkap" aria-describedby="namaHelp" placeholder="Masukan Nama">
                                    </div>
                                    <div class="form-group">
                                        <label for="namaLengkap">Email Address</label>
                                        <input type="email" class="form-control" v-model="customerInfo.email" id="emailAddress" aria-describedby="emailHelp" placeholder="Masukan Email">
                                    </div>
                                    <div class="form-group">
                                        <label for="namaLengkap">No. HP</label>
                                        <input type="text" class="form-control" v-model="customerInfo.number" id="noHP" aria-describedby="noHPHelp" placeholder="Masukan No. HP">
                                    </div>
                                    <div class="form-group">
                                        <label for="alamatLengkap">Alamat Lengkap</label>
                                        <textarea class="form-control" id="alamatLengkap" rows="3" v-model="customerInfo.address"></textarea>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="proceed-checkout">
                                <ul>
                                    <li class="subtotal">ID Transaction <span>#SH12000</span></li>
                                    <li class="subtotal mt-3">Subtotal <span>${{ totalPrice }}</span></li>
                                    <li class="subtotal mt-3">Pajak <span>${{ tax }} (10%)</span></li>
                                    <li class="subtotal mt-3">Total Biaya <span>${{ totalTax }}</span></li>
                                    <li class="subtotal mt-3">Bank Transfer <span>Mandiri</span></li>
                                    <li class="subtotal mt-3">No. Rekening <span>2208 1996 1403</span></li>
                                    <li class="subtotal mt-3">Nama Penerima <span>Shayna</span></li>
                                </ul>
                                <a @click="checkout()" href="#" class="proceed-btn">I ALREADY PAID</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Shopping Cart Section End -->
    </div>
</template>
<script>
import HeaderShayna from "@/components/HeaderShayna.vue";
import axios from 'axios';
// import FooterShayna from "@/components/FooterShayna.vue";
export default {
    name: 'ShoppingCartView',
    components:{
        HeaderShayna,
        // FooterShayna
    },
    data() {
	return {
		cart: [],
        customerInfo: {
            name:'',
            email:'',
            number:'',
            address:'',
        }
	}
	},
	methods:{
		removeItem(index){
			this.cart.splice(index, 1);
			const parsed = JSON.stringify(this.cart);
            localStorage.setItem('cart', parsed);
		},
        checkout(){
            let productId = this.cart.map(product => {
                return product.id
            })

            console.log(productId);
            let checkoutData = {
                "name": this.customerInfo.name,
                "email": this.customerInfo.email,
                "number": this.customerInfo.number,
                "address": this.customerInfo.address,
                "transaction_total": this.totalTax,
                "transaction_status": "PENDING",
                "transaction_details": productId,
            }

            //post axios
            axios.post('http://shayna-backend.local/api/checkout', checkoutData)
            .then(response => {
                console.log(response.data);
                this.$router.push('/success');
                localStorage.removeItem('cart');
            })
            .catch(error => {
                console.log(error);
            })
        }
	},
	mounted(){
		if (localStorage.getItem('cart')) {
			try {
				this.cart = JSON.parse(localStorage.getItem('cart'));
			} catch(e) {
				localStorage.removeItem('cart');
			}
		}
	},
    computed:{
		totalPrice(){
			return this.cart.reduce((total, item) => total + item.price, 0);
		},
        tax(){
            return this.totalPrice * 0.1;
        },
        totalTax(){
            return this.totalPrice + this.tax;
        },
        
	}
}
</script>