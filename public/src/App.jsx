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
        const rowStyle = {border: "1px solid silver", padding: 4};
        const productRows = this.props.products.map(product => <ProductRow key={product.id} product={product}/>);
        return(
            <table className="prodTable">
                <thead>
                    <tr>
                    <th style={rowStyle}>Product Name</th>
                    <th style={rowStyle}>Price</th>
                    <th style={rowStyle}>Category</th>
                    <th style={rowStyle}>Image</th>                    
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
        const rowStyle = {border: "1px solid silver", padding: 4};                
        return(            
            <tr>
                <td align="center" style={rowStyle}>{product.productName}</td>
                <td align="center" style={rowStyle}>${product.pricePerUnit}</td>
                <td align="center" style={rowStyle}>{product.category}</td>
                <td align="center" style={rowStyle}><a href={product.imageUrl} target="_blank">View</a></td>                
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
            <div>
                <h3>Add a new product to inventory</h3>
                <hr/>
                <div className="row">
                    <form name="productAdd" onSubmit={this.handleSubmit}>
                        <div className="column">                            
                            <p><label htmlFor="category">Category : </label><br/>
                                <select name="category">
                                    <option value="Shirts">Shirts</option>
                                    <option value="Jeans">Jeans</option>
                                    <option value="Jackets">Jackets</option>
                                    <option value="Sweaters">Sweaters</option>
                                    <option value="Accessories">Accessories</option>
                                </select>
                            </p>
                            <p>
                                <label htmlFor="productName">Product Name : </label><br/>
                                <input type="text" name="productName"/>
                            </p>
                            <button className="button">Add Product</button>
                        </div>
                        <div className="column">                            
                            <p>
                                <label htmlFor="pricePerUnit">Price Per Unit : </label><br/>
                                <input type="text" name="pricePerUnit" defaultValue="$"/>
                            </p>
                            <p>
                                <label htmlFor="image">Image : </label><br/>
                                <input type="text" name="imageUrl" />
                            </p>
                        </div>
                    </form>
                </div>               
            </div>
        )
    }  
}

const element = <ProductList/>
ReactDOM.render(element, document.getElementById('content'));