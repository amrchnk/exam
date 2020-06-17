<template>
	<main class="work">
		<div class="addWorkers">
			<h1>Введите данные сотрудника</h1>

			<div class="str">
				<label for="">Фамилия</label>
				<input type="text" v-model='elem.surname' placeholder="введите фамилию">
			</div>

			<div class="str">
				<label >Имя</label>
				<input type="text" v-model='elem.name' placeholder="введите имя">
			</div>

			<div class="str">
				<label for="">Отчество</label>
				<input type="text" v-model='elem.otch' placeholder="введите отчество">
			</div>
			
			<div class="features">
				<select v-model="elem.otdel">
					<option>IT отдел</option>	
					<option>отдел продаж</option>	
					<option>отдел доставки</option>	
					<option>юридический отдел</option>	
				</select>

				<button class="btn btn-primary" @click="Add">Добавить</button>
			</div>
			
		</div>

		<div class="list">
			<h1 class="sp">Список сотрудников</h1>
			<ul>
				<li v-for="(item,id) in workers" v-bind:key=id>
					<label>{{item.surname}} {{item.name}} {{item.otch}} {{item.otdel}}</label>
					<button class="btn btn-link" @click="Change(id)">Изменить</button>
				</li>
			</ul>
		</div>
	</main>
</template>

<script>
	export default{
		data(){
			return{
				elem:{
					surname:"",
					name:"",
					otch:"",
					otdel:""
				},
				workers:[],
				editing:-1,
				cur_id:-1
			}
		},
		methods:{
			async Add(){
				if(!(this.elem.surname==""||this.elem.name==""||this.elem.otch==""||this.elem.otdel=="")){
					if(this.editing===-1){
						this.workers.push({
							surname:this.elem.surname,
							name:this.elem.name,
							otch:this.elem.otch,
							otdel:this.elem.otdel,
						});

						try{
							await this.$http
							.post("http://localhost:3000/workers",this.elem);
							this.Update();
						}

						catch(err){
							console.error(err);
						}	
					}
					else{
						this.workers[this.editing]={
							id:this.elem.id,
							surname:this.elem.surname,
							name:this.elem.name,
							otch:this.elem.otch,
							otdel:this.elem.otdel,
						}

						try{
							console.log(this.workers[this.editing]);
							await this.$http.put('http://localhost:3000/workers/'+ this.cur_id, this.workers[this.editing]);
							this.Update();
						}

						catch(err){
							console.error(err)
						}
						this.editing=-1;
					}
					
				}
				else{
					alert('Поля должны быть заполнены!');
				}
			},
		Change(id){
			this.elem={
				surname:this.workers[id].surname,
				name:this.workers[id].name,
				otch:this.workers[id].otch,
				otdel:this.workers[id].otdel,
			};
			this.cur_id=this.workers[id].id;
			this.editing=id;
		},

		async Update(){
			try{
					let res=await this.$http.get("http://localhost:3000/workers");
					this.workers=await res.json();
				}

			catch(err){
				console.error(err);
			}
		}
		},
		created(){
			this.Update();
		}
	}
</script>

<style>
	.list{
		margin-top:30px;
		margin-left:20px;
	}
	.work{
		background: #white;
		width: 100%;
		height: 100vh;
	}

	input{
		margin-left: 15px;
	}

	button{
		margin-left:10px;
	}

	.addWorkers{
		margin-left:20px;
		margin-top:30px;
	}

	.str{
		margin-top:10px;
	}

	.features{
		margin-top:10px;
	}

	h1{
		font-size: 20px;
	}

	li{
		list-style-type: none;
	}
</style>