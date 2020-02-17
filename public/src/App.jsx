class ProductList extends React.Component{
    constructor(){
        super();
        this.state = {products : []};
        this.addProduct = this.addProduct.bind(this);
    }
    
    addProduct(product){
        product.id = this.state.products.length + 1;        
        const newProductsList = this.state.products.slice();
        newProductsList.push(product);
        this.setState({products:newProductsList});
    }
    
    render(){
        return(
            <React.Fragment>
                <h1>My Company Inventory</h1>                
                <hr/>
                <h3>Showing all available products</h3>
                <hr/>
                <ProductTable products = {this.state.products}/>
                <hr/>
                <ProductAdd addProduct = {this.addProduct}/>
            </React.Fragment>
        )
    }
}

class ProductTable extends React.Component {   
    render() {
        
        const productRows = this.props.products.map(product => <ProductRow key={product.id} product={product}/>);
        return(
            <table>
                <thead>
                    <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>                    
                    </tr>
                </thead>
                <tbody>
                    {productRows}
                </tbody>
            </table>
        )
    }  
}

class ProductRow extends React.Component{
    render(){        
        const product = this.props.product;
        return(            
            <tr>
                <td>{product.productName}</td>
                <td>${product.pricePerUnit}</td>
                <td>{product.category}</td>
                <td><a href={product.imageUrl} target="_blank">View</a></td>                
            </tr>
        )
    }
}

class ProductAdd extends React.Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);        
    }
    handleSubmit(e){
        e.preventDefault();
        const form = document.forms.productAdd;
        const price = form.pricePerUnit.value;
        const product = {
            category : form.category.value,
            pricePerUnit : price.substring(1,price.length),
            productName : form.productName.value,
            imageUrl : form.imageUrl.value,            
        }
        this.props.addProduct(product);
        form.category.value="";
        form.pricePerUnit.value="$";        
        form.productName.value="";
        form.imageUrl.value="";
    }
    render() {
        return(
            <form name="productAdd" onSubmit={this.handleSubmit}>
                <select name="category">
                    <option value="Shirts">Shirts</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Jackets">Jackets</option>
                    <option value="Sweaters">Sweaters</option>
                    <option value="Accessories">Accessories</option>
                </select>
                <input type="text" name="pricePerUnit" placeholder="Price Per Unit" defaultValue="$"/>
                <input type="text" name="productName" placeholder="Product Name" />
                <input type="text" name="imageUrl" placeholder="Image URL" />
                <button>Add Product</button>
            </form>
        )
    }  
}

const element = <ProductList/>
ReactDOM.render(element, document.getElementById('content'));