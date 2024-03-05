import { navigateTo } from '../../../router/index.js';
import { getCookie } from '../lib/getCookie.js';

export const adminProductSetting = () => {
  const cookie = getCookie('roleId');

  const $productInput = document.getElementById('product');
  const $imageForm = document.getElementById('imageForm');
  const $previewContainer = document.querySelectorAll('#previewContainer img');

  $productInput.addEventListener('change', previewImages);
  $imageForm.addEventListener('submit', handleSubmit);

  const $prodName = document.getElementById('productName');
  const $prodContent = document.getElementById('prodContent');
  const $productCategory = document.getElementById('productCategory');
  const $prodRemains = document.getElementById('stock');
  // const $prodModificationDate = document.getElementById('prodModificationDate');
  const $prodSize = document.getElementById('productSize');
  const $prodColor = document.getElementById('productColor');
  const $prodPrice = document.getElementById('productPrice');
  // const $prodmidifiedData = document.getElementById('prodModificationDate');
  const $prodAdd = document.querySelector('.prodAdd');
  const $prodUpdate = document.querySelector('.prodUpdate');
  const $prodDelete = document.querySelector('.prodDelete');
  const altValues = []; // alt 속성 값을 저장할 배열을 초기화합니다.

  $prodAdd.addEventListener('click', () => {
    $previewContainer.forEach((imgTag) => {
      const { alt } = imgTag;
      altValues.push(alt);
    });
    fetch(`/server/api/admin/products`, {
      method: 'POST',
      body: JSON.stringify({
        prodName: $prodName.value,
        prodContent: $prodContent.value,
        prodSubCategory: { prodSubCategory: $productCategory.value },
        prodCost: $prodPrice.value,
        prodSize: $prodSize.value,
        prodColor: $prodColor.value,
        prodRemains: $prodRemains.value,
        prodImgs: altValues
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      alert('요청이 처리되지않았습니다.');
      throw new Error('요청이 처리되지 않았습니다.');
    }
    alert('상품이 생성되었습니다.');
  });

  $prodUpdate.addEventListener('click', async () => {
    const urlParams = new URLSearchParams(location.search);
    const prodId = urlParams.get('prodId');

    $previewContainer.forEach((imgTag) => {
      const { alt } = imgTag;
      altValues.push(alt);
    });
    const res = await fetch(`/server/api/admin/products?prodNum=${prodId}`, {
      method: 'PUT',
      body: JSON.stringify({
        prodName: $prodName.value,
        prodContent: $prodContent.value,
        prodSubCategory: { prodSubCategory: $productCategory.value },
        prodCost: $prodPrice.value,
        prodSize: $prodSize.value,
        prodColor: $prodColor.value,
        prodRemains: $prodRemains.value,
        prodImgs: altValues
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      alert('요청이 수정되었습니다.');
      throw new Error('요청이 수정되지 않았습니다.');
    }
    alert('상품이 수정되었습니다.');
  });

  $prodDelete.addEventListener('click', async () => {
    const urlParams = new URLSearchParams(location.search);
    const prodId = urlParams.get('prodId');

    const res = await fetch(`/server/api/admin/products?prodNum=${prodId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      alert('상품이 삭제되지않았습니다.');
      throw new Error('상품이 삭제되지 않았습니다.');
    }
    alert('상품이 삭제되었습니다.');
    navigateTo(`/server/admin/adminProductList`);
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();
  const imageInput = document.getElementById('product');
  if (imageInput.files?.length <= 0) {
    alert('파일을 넣어주세요');
    throw new Error('파일을 넣어주세요');
  }
  const formData = new FormData();
  for (const image of imageInput.files) {
    formData.append('img', image);
  }
  try {
    const imageLocation = await imagePost(formData);
    alert(`상품 이미지를 저장했습니다.`);
    return imageLocation;
  } catch (error) {
    alert('상품 이미지를 저장하는데 실패하였습니다.');
    console.error(error);
  }
};

const imagePost = async (formData) => {
  const res = await fetch(`/server/api/image/upload`, {
    method: 'POST',
    body: formData
  });
  console.log(res);

  if (!res.ok) {
    throw new Error('제출에 실패하였습니다.');
  }

  return await res.json();
};

// 각 파일에 대해 미리보기
const previewImages = (event) => {
  const { files } = event.target;
  const $previewContainer = document.getElementById('previewContainer');

  while ($previewContainer.firstChild) {
    $previewContainer.removeChild($previewContainer.firstChild);
  }

  for (const file of files) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const previewItem = document.createElement('div');
      previewItem.classList.add('previewItem');

      const img = document.createElement('img');
      img.src = e.target.result;

      previewItem.appendChild(img);
      $previewContainer.appendChild(previewItem);
    };

    reader.readAsDataURL(file);
  }
};
