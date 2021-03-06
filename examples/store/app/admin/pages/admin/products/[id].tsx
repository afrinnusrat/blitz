import {Suspense} from "react"
import {Link, useRouter, useQuery, useParam} from "blitz"
import getProduct from "app/products/queries/getProduct"
import ProductForm from "app/products/components/ProductForm"
import {queryCache} from "react-query"

function Product() {
  const router = useRouter()
  const id = useParam("id", "number")
  const [product] = useQuery(getProduct, {where: {id}})

  return (
    <ProductForm
      product={product}
      onSuccess={async () => {
        await router.push("/admin/products")
        queryCache.invalidateQueries("/api/products/queries/getProducts")
      }}
    />
  )
}

function EditProductPage() {
  return (
    <div>
      <h1>Edit Product</h1>
      <p>
        <Link href="/admin/products">
          <a>Manage Products</a>
        </Link>
      </p>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Product />
        </Suspense>
      </div>
    </div>
  )
}

export default EditProductPage
