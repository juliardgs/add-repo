// class List{
//     constructor(){
//         this.data = [];
//     }

//     add(data){
//         this.data.push(data)
//         console.log(this.data)
//     }
// }

// class TodoList extends List {
//     constructor(){
//         super() //chama o constructor da classe pai
//         this.usuario = 'Júlia'
//     }

//     mostraUsuario(){
//         console.log(this.usuario)
//     }

// }

// var MinhaLista = new TodoList();

// document.getElementById('adicionarTodo').onclick = function(){
//     MinhaLista.add('Novo todo');
// }

// MinhaLista.mostraUsuario();

//DESESTRUTURAÇAO

// const usuario = {
//     nome: 'Julinha',
//     idade: 21,
//     eTop: true
// }

// const {nome, eTop} = usuario;

// console.log(nome)
// console.log(eTop)

// function mostraUsuario({nome, eTop}){
//     console.log(`Meu nome é ${nome}, sou Top? ${eTop}`)
// }

// mostraUsuario(usuario)

// REST => pega o resto das propriedades

//em objetos
// const usuario = {
//         nome: 'Julinha',
//         idade: 21,
//         eTop: true
//     }

// const {nome, ...resto} = usuario

// console.log(nome)
// console.log(resto)

//em arrays

// const arr = [1,2,3,4]

// const [a, b, ...c] = arr;

// console.log(a)
// console.log(b)
// console.log(c)

//em parâmetros de funções

// function soma(a, b, ...params){ //params vai armazenar num array o resto dos parâmetros enviados a função
//     return params;
// }

// console.log(soma(1,2,3,45,4,457,41758,5427,4))

//SPREAD => repassa as informações de algum obj ou array pra outra estrutura de dados

//em arrays
// const arr1 = [1,2,3]
// const arr2 = [4,5,6]

// const arr3 = [...arr1, ...arr2]
// console.log(arr3) // [1,2,3,4,5,6]

//em objetos (ex: copiar as propriedades e alterar uma)

// const usuario = {
//     nome: 'Julinha',
//     idade: 21,
//     eTop: true
// }

// const usuario2 = {...usuario, nome: 'Júlia'}
// console.log(usuario2)

//Object Short Syntax

// const nome = "Júlia"
// const idade = 21

// const usuario = {
//     nome, //quando o nome da propriedade é igual ao nome da variável, pode-se suprimir o nome da prop
//     idade,
//     empresa: 'UGB'
// }

// console.log(usuario)

//testando o webpack
// import {soma} from './funcoes'

// console.log(soma(1,2))

//---------------------------------------------//
import api from './api'


class App {
    constructor(){
        this.repositories = []
        this.formEl = document.getElementById('repo-form')
        this.inputEl = document.querySelector('input[name=repository]')
        this.listEl = document.getElementById('repo-list')
        this.registerHandlers();
    }

    registerHandlers(){
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true){
        if(loading === true){
            let loadingEl = document.createElement('span')
            loadingEl.appendChild(document.createTextNode('Carregando'))
            loadingEl.setAttribute('id', 'loading')

            this.formEl.appendChild(loadingEl)
        } else {
            document.getElementById('loading').remove()
        }
    }

    async addRepository(event){
        event.preventDefault();

        const repoInput = this.inputEl.value

        if(repoInput.length === 0)
            return;

        this.setLoading()
        try{
            const response = await api.get(`/repos/${repoInput}`)

            //utilizando desestruturação
            const { name, description, html_url, owner: { avatar_url } } = response.data

            console.log(response)
            
            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url,
            })
            this.inputEl.value = ''
            this.render()
        }
        catch (err){
            alert('O repositório não existe')
        }

        this.setLoading(false)
    }

    render(){
        this.listEl.innerHTML = ''

        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img')
            imgEl.setAttribute('src', repo.avatar_url)

            let titleEl = document.createElement('strong')
            titleEl.appendChild(document.createTextNode(repo.name))

            let descriptionEl = document.createElement('p')
            descriptionEl.appendChild(document.createTextNode(repo.description))

            let linkEl = document.createElement('a')
            linkEl.setAttribute('target', '_blank')
            linkEl.setAttribute('href', repo.html_url)
            linkEl.appendChild(document.createTextNode('Acessar'))

            let listItemEl = document.createElement('li')
            listItemEl.appendChild(imgEl)
            listItemEl.appendChild(titleEl)
            listItemEl.appendChild(descriptionEl)
            listItemEl.appendChild(linkEl)

            this.listEl.appendChild(listItemEl)
        })
    }
}
new App()