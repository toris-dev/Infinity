import { navigateTo } from '../../../router/index.js';

export const adminProductSetting = () => {
  const $productInput = document.getElementById('product');
  const $previewImgs = document.querySelectorAll(
    '#previewContainer previewItem img'
  );

  $productInput.addEventListener('change', previewImages);

  const $prodName = document.getElementById('productName');
  const $prodContent = document.getElementById('prodContent');
  const $prodMajorCategory = document.getElementById('prodMajorCategory');
  const $prodSubCategories = document.getElementById('prodSubCategories');
  const $prodRemains = document.getElementById('stock');
  const $prodSize = document.getElementById('productSize');
  const $prodColor = document.getElementById('productColor');
  const $prodPrice = document.getElementById('productPrice');
  const $prodAddBtn = document.querySelector('.prodAdd');
  const $prodUpdateBtn = document.querySelector('.prodUpdate');
  const $prodDeleteBtn = document.querySelector('.prodDelete');
  const altValues = []; // alt 속성 값을 저장할 배열을 초기화합니다.

  // 상품 추가
  $prodAddBtn.addEventListener('click', async () => {
    const imageInput = document.getElementById('product');
    if (imageInput.files?.length <= 0) {
      alert('파일을 넣어주세요');
      throw new Error('파일을 넣어주세요');
    }
    const formData = new FormData();
    for (const image of imageInput.files) {
      formData.append('img', image);
    }
    formData.append('prodName', $prodName.value);
    formData.append('prodContent', $prodContent.value);
    formData.append('prodMajorCategory', $prodMajorCategory.value);
    formData.append('prodSubCategories', $prodSubCategories.value);
    formData.append('prodCost', $prodPrice.value);
    formData.append('prodSize', $prodSize.value);
    formData.append('prodColor', $prodColor.value);
    formData.append('prodRemains', $prodRemains.value);

    const res = await fetch(`/server/api/admin/products`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) {
      alert('요청이 처리되지않았습니다.');
      throw new Error('요청이 처리되지 않았습니다.');
    }
    alert('상품이 생성되었습니다.');
  });

  // 상품 업데이트
  $prodUpdateBtn.addEventListener('click', async () => {
    const urlParams = new URLSearchParams(location.search);
    const prodId = urlParams.get('prodId');

    const formData = new FormData();
    const imageInput = document.getElementById('previewItem');
    if (imageInput.files?.length <= 0) {
      alert('파일을 넣어주세요');
      for (const image of imageInput.files) {
        formData.append('img', image);
      }
    } else {
      $previewImgs.forEach((imgTag) => {
        const { alt } = imgTag;
        altValues.push(alt);
      });
    }

    formData.append('prodName', $prodName.value);
    formData.append('prodContent', $prodContent.value);
    formData.append('prodMajorCategory', $prodMajorCategory.value);
    formData.append('prodSubCategories', $prodSubCategories.value);
    formData.append('prodCost', $prodPrice.value);
    formData.append('prodSize', $prodSize.value);
    formData.append('prodColor', $prodColor.value);
    formData.append('prodRemains', $prodRemains.value);

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

  // 상품 삭제
  $prodDeleteBtn.addEventListener('click', async () => {
    const urlParams = new URLSearchParams(location.search);
    const prodId = urlParams.get('prodId');
    if (!prodId) {
      alert('해당 상품의 ID가 존재하지 않습니다.');
    }

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

// 각 파일에 대해 미리보기
const previewImages = (event) => {
  const { files } = event.target;
  const $previewImgs = document.getElementById('previewContainer');

  while ($previewImgs.firstChild) {
    $previewImgs.removeChild($previewImgs.firstChild);
  }

  for (const file of files) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const previewItem = document.createElement('div');
      previewItem.classList.add('previewItem');

      const img = document.createElement('img');
      img.src = e.target.result;

      previewItem.appendChild(img);
      $previewImgs.appendChild(previewItem);
    };

    reader.readAsDataURL(file);
  }
};
