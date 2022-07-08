<template>
	<div>
		<!-- Header Section Begin -->
		<header class="header-section">
			<div class="header-top">
				<div class="container">
					<div class="ht-left">
						<div class="mail-service">
							<i class="fa fa-envelope"></i> hello.shayna@gmail.com
						</div>
						<div class="phone-service">
							<i class="fa fa-phone"></i> +628 22081996
						</div>
					</div>
				</div>
			</div>
			<div class="container">
				<div class="inner-header">
					<div class="row">
						<div class="col-lg-2 col-md-2">
							<div class="logo">
								<a href="./index.html">
									<img src="img/logo_website_shayna.png" alt="" />
								</a>
							</div>
						</div>
						<div class="col-lg-7 col-md-7"></div>
						<div class="col-lg-3 text-right col-md-3">
							<ul class="nav-right">
								<li class="cart-icon">
									Keranjang Belanja &nbsp;
									<a href="#">
										<i class="icon_bag_alt"></i>
										<span>{{ cart.length }}</span>
									</a>
									<div class="cart-hover">
										<div class="select-items">
											<table>
												<tbody v-if="cart.length>0">
													<tr v-for="item in cart" :key="item.id">
														<td class="si-pic">
															<img class="photo-item" :src="item.photo" alt="" />
														</td>
														<td class="si-text">
															<div class="product-selected">
																<p>${{ item.price }}</p>
																<h6>{{ item.name }}</h6>
															</div>
														</td>
														<td @click="removeItem(item.id)" class="si-close">
															<i class="ti-close"></i>
														</td>
													</tr>
												</tbody>
												<tbody v-else>
													<tr>
														<td>Keranjang Kosong</td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="select-total">
											<span>total:</span>
											<h5>${{ totalPrice }}</h5>
										</div>
										<div class="select-button">
											<router-link href="#" to="/cart" class="primary-btn view-card">
												VIEW CARD
												<!-- <a href="#" class="primary-btn view-card">VIEW CARD</a> -->
											</router-link>
											<a href="#" class="primary-btn checkout-btn">CHECK OUT</a>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</header>
		<!-- Header End -->
	</div>
</template>
<script>
export default {
    name: 'HeaderSahyna',
	data() {
	return {
		cart: [],
	}
	},
	methods:{
		removeItem(idx){
			// this.cart.splice(index, 1);
			// const parsed = JSON.stringify(this.cart);
            // localStorage.setItem('cart', parsed);
			let cartUserStorage = JSON.parse(localStorage.getItem('cart'))
			let itemCartStorage = cartUserStorage.map(itemCartStorage => itemCartStorage.id)
			console.log(itemCartStorage)

			let index = itemCartStorage.findIndex(id => id == idx)
			console.log(index)
			this.cart.splice(index, 1)

			const parsed = JSON.stringify(this.cart);
			localStorage.setItem('cart', parsed);
			window.location.reload();
		},
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
		}
	}
}
</script>

<style scoped>
	.photo-item{
		width: 80px;
		height: 80px;
	}
</style>