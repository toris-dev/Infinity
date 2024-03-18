export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};
export const roleCheck = () => {
  const cookieString = document.cookie;
  const roleIdRegex = /(?:^|;\s*)roleId=(admin|client)/;
  const match = cookieString.match(roleIdRegex);
  if (match) {
    const roleId = match[1]; // roleId 값은 match 배열의 두 번째 요소에 있습니다.
    return roleId;
  } else {
    return null;
  }
};
