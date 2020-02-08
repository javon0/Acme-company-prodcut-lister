
const generateProducts = ({products}) =>{
    const lis = products.map((prod, idx) => {
        let prodCard = `${prod.name} - ${prod.description}`
        return React.createElement('li', {key: idx}, prodCard)
    })
    return React.createElement('ul', null, lis)

}

const generateCompanies = ({companies}) =>{
    const lis = companies.map((comp, idx) => {
        let compCard = `${comp.name}`
        return React.createElement('li', {key: idx}, compCard)
    })
    return React.createElement('ul', null, lis)

}

class App extends React.Component {
    constructor(){
        super()
        
        this.state = {
            products: [],
            companies: [],
            view: ''
            

        }
    }


     componentDidMount(arrOfData) {

        const dataPromise = Promise.all([axios.get('https://acme-users-api-rev.herokuapp.com/api/companies'), axios.get('https://acme-users-api-rev.herokuapp.com/api/products')])
        .then(response => {
            let arrOfData = [response[0].data, response[1].data]
            return arrOfData

        })
        dataPromise.then(arrOfData => {
            this.setState({
                products: arrOfData[1],
                companies: arrOfData[0],
                view: window.location.hash.slice(1) 
             })

        })


        window.addEventListener('hashchange', () => {
            const { products, companies } = this.state

           if( window.location.hash === '#companies') { 
            this.setState({
                view: 'companies'
            }
            )
           }
           if( window.location.hash === '#products') { 
            this.setState({
                view: 'products'
            }
            )
           }
        })
    }

    
    render(){
        const { products, companies,view } = this.state

        if(view === 'companies'){

        return React.createElement(generateCompanies, {companies}) }  

            return React.createElement(generateProducts, {products})
    }
}

const root = document.querySelector('#root')
ReactDOM.render(React.createElement(App), root)
