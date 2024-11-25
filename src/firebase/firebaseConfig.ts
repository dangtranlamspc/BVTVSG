import firestore from '@react-native-firebase/firestore';


const productRef = firestore().collection('products');
const categoriesRef = firestore().collection('categories');
const userRef = firestore().collection('users');
const sliderRef = firestore().collection('sliders');
const bsctRef = firestore().collection('bsct')
const nndtRef = firestore().collection('nndt')
const categoriesnndtRef = firestore().collection('categoriesnndt')
const categoriesctgdRef = firestore().collection('categoriesctgd')
const ctgdRef = firestore().collection('ctgd')



export {
  productRef,
  categoriesRef,
  userRef,
  sliderRef,
  bsctRef,
  nndtRef,
  categoriesnndtRef,
  categoriesctgdRef,
  ctgdRef
};