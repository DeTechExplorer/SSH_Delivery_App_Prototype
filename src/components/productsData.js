// productsData.js

export const productsData = {
    'dairy': {
      id: 'dairy',
      name: 'Dairy',
      image: 'https://www.mishry.com/wp-content/uploads/2020/08/best-dairy-products.png',
      products: [
        {
            id: 'dairy-001',
            name: 'Fresh Whole Milk',
            price: 1.50,
            unit: '2L',
            image: 'https://www.pngall.com/wp-content/uploads/2016/06/Milk-PNG-Clipart.png',
            category: 'dairy',
            inStock: true
          },
          {
            id: 'dairy-002',
            name: 'Cheddar Cheese',
            price: 3.20,
            unit: '400g',
            image: 'https://pngimg.com/d/cheese_PNG25300.png',
            category: 'dairy',
            inStock: true
          },
          {
            id: 'dairy-003',
            name: 'Greek Yogurt',
            price: 1.80,
            unit: '500g',
            image: 'https://www.yoplait.ca/wp-content/uploads/2018/09/source-vanilla-460x460-1.png',
            category: 'dairy',
            inStock: true
          },
          {
            id: 'dairy-004',
            name: 'Butter',
            price: 2.20,
            unit: '250g',
            image: 'https://pngimg.com/d/butter_PNG19.png',
            category: 'dairy',
            inStock: true
          },
          {
            id: 'dairy-005',
            name: 'Double Cream',
            price: 1.30,
            unit: '300ml',
            image: 'https://m.media-amazon.com/images/I/51jiDFtJChL.jpg',
            category: 'dairy',
            inStock: true
          },
          {
            id: 'dairy-006',
            name: 'Cottage Cheese',
            price: 1.90,
            unit: '300g',
            image: 'https://pngimg.com/d/cottage_cheese_PNG1.png',
            category: 'dairy',
            inStock: true
          },
          {
            id: 'dairy-007',
            name: 'Sour Cream',
            price: 1.75,
            unit: '300ml',
            image: 'https://storage.googleapis.com/spoonful_product_images_compressed/94123869-300x300.webp',
            category: 'dairy',
            inStock: true
          },
          {
            id: 'dairy-008',
            name: 'Fresh Mozzarella',
            price: 2.45,
            unit: '200g',
            image: 'https://www.hastycart.ca/wp-content/uploads/2024/04/21082488_front_a06_@2.png',
            category: 'dairy',
            inStock: true
          },
          {
            id: 'dairy-009',
            name: 'Cream Cheese',
            price: 1.95,
            unit: '500g',
            image: 'https://cdn.puckarabia.com/494b1e/globalassets/new-products-pictures/packshots/resized/11-puck-cream-500g-en.png?width=500&height=500&mode=crop&format=webp',
            category: 'dairy',
            inStock: true
          },
          {
            id: 'dairy-010',
            name: 'Fresh Ricotta',
            price: 2.30,
            unit: '200g',
            image: 'https://down-th.img.susercontent.com/file/th-11134207-23020-aits9a22zlnve6',
            category: 'dairy',
            inStock: true
          },
          {
            id: 'dairy-011',
            name: 'Vanilla Milkshake',
            price: 1.99,
            unit: '500ml',
            image: 'https://www.ampulla.co.uk/wp-content/uploads/2024/03/500ml-Plastic-Milkshake-Bottle-filled-with-cap.jpg',
            category: 'dairy',
            inStock: true
          },
          {
            id: 'dairy-012',
            name: 'Greek Feta',
            price: 2.75,
            unit: '100g',
            image: 'https://grikios.com/wp-content/uploads/sites/2/2022/08/3258_GRIKIOS_feta_cheese-980x1152.jpg',
            category: 'dairy',
            inStock: true
          }
      ]
    },
  
          
        
      };
  
  
  export const promotionsData = {
    id: 'promotions',
    name: 'Special Offers - 20% Off',
    products: [
      {
        id: 'promo-001',
        name: 'Chocolate Cake',
        originalPrice: 18.99,
        discountedPrice: 15.19,
        unit: 'cake',
        image: 'https://bonnibakery.com/wp-content/uploads/2021/01/ChocolateCake-2-scaled.jpg',
        discount: 20,
        category: 'promotions',
        inStock: true
      },
      {
        id: 'promo-002',
        name: 'Classic Cheesecake',
        originalPrice: 16.99,
        discountedPrice: 13.59,
        unit: 'cake',
        image: 'https://stateofdinner.com/wp-content/uploads/2023/03/no-bake-vanilla-cheesecake-featured-2-500x375.jpg',
        discount: 20,
        category: 'promotions',
        inStock: true
      },
      {
        id: 'promo-003',
        name: 'Sausages',
        originalPrice: 3.25,
        discountedPrice: 2.06,
        unit: 'pack',
        image: 'https://images.cdn.shoprite.com/detail/00077782030181_1',
        discount: 20,
        category: 'promotions',
        inStock: true
      },
      {
        id: 'promo-004',
        name: 'Cottage Cheese',
        originalPrice: 3.20,
        discountedPrice: 2.56,
        unit: 'pack',
        image: 'https://pngimg.com/d/cottage_cheese_PNG1.png',
        discount: 20,
        category: 'promotions',
        inStock: true
      },
      {
        id: 'promo-005',
        name: 'Ice lollies',
        originalPrice: 2.80,
        discountedPrice: 2.24,
        unit: 'pack',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQieO0lS3EATr1FEHvH5ArVfyphqUJBHbluIg&s',
        discount: 20,
        category: 'promotions',
        inStock: true
      },
      {
        id: 'promo-006',
        name: 'Pepsi',
        originalPrice: 2.00,
        discountedPrice: 1.60,
        unit: 'can',
        image: 'https://marino.ae/cdn/shop/files/Pepsi-Can-250-ml-30x250ml-_1-carton_-Marino.AE-234557742.jpg?v=1707548947&width=750',
        discount: 20,
        category: 'promotions',
        inStock: true
      },
      {
        id: 'promo-007',
        name: 'Soap',
        originalPrice: 1.80,
        discountedPrice: 1.44,
        unit: 'bar',
        image: 'https://marino.ae/cdn/shop/files/DETTOL-SOAP-SKINCARE-165GMx48-_ARABIC_-_1-carton_-Marino.AE-215398875.jpg?v=1706689942',
        discount: 20,
        category: 'promotions',
        inStock: true
      },
      {
        id: 'promo-008',
        name: 'Ground Black Pepper',
        originalPrice: 1.30,
        discountedPrice: 1.04,
        unit: '50g',
        image: 'https://digitalcontent.api.tesco.com/v2/media/ghs/22fb224a-1658-4e34-8ea4-59eaa1812ce1/9ae31267-0e37-4d3b-a720-96184d2cd3de_1296891052.jpeg?h=960&w=960',
        discount: 20,
        category: 'promotions',
        inStock: true
      },
      {
        id: 'promo-009',
        name: 'Strawberry',
        originalPrice: 2.50,
        discountedPrice: 2.00,
        unit: 'punnet',
        image: 'https://pngimg.com/d/strawberry_PNG2598.png',
        discount: 20,
        category: 'promotions',
        inStock: true
      },
      {
        id: 'promo-010',
        name: 'Teabags',
        originalPrice: 2.50,
        discountedPrice: 2.00,
        unit: '80 pack',
        image: 'https://m.media-amazon.com/images/I/713C+S18uSL._AC_UF894,1000_QL80_.jpg',
        discount: 20,
        category: 'promotions',
        inStock: true
      },
      {
        id: 'promo-011',
        name: 'Olive Oil',
        originalPrice: 3.99,
        discountedPrice: 3.19,
        unit: '500ml',
        image: 'https://m.media-amazon.com/images/I/41rhraxOdWL.jpg',
        discount: 20,
        category: 'promotions',
        inStock: true
      },
      {
        id: 'promo-012',
        name: 'Shampoo',
        originalPrice: 3.50,
        discountedPrice: 2.80,
        unit: 'bottle',
        image: 'https://m.media-amazon.com/images/I/51Be9C6cvTS.jpg',
        discount: 20,
        category: 'promotions',
        inStock: true
      }
    ]
  };
  
  
  export const getPromotions = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(promotionsData);
      }, 300);
    });
  };
   
  
  // Helper functions to simulate API calls
  export const getAllCategories = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories = Object.values(productsData).map(({ id, name, image }) => ({
          id,
          name,
          image
        }));
        resolve(categories);
      }, 300);
    });
  };
  
  export const getProductsByCategory = (categoryId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const category = productsData[categoryId];
        if (category) {
          resolve({
            categoryName: category.name,
            products: category.products
          });
        } else {
          reject(new Error('Category not found'));
        }
      }, 300);
    });
  };
  
  export const getAllProducts = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allProducts = Object.values(productsData).flatMap(category => 
          category.products
        );
        resolve(allProducts);
      }, 300);
    });
  };
  
  export const searchProducts = (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allProducts = Object.values(productsData).flatMap(category => 
          category.products
        );
        const filteredProducts = allProducts.filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filteredProducts);
      }, 300);
    });
  };