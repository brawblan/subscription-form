export function formattedName(firstName, lastName) {
  return `${firstName ?? ''} ${lastName ?? ''}`;
}


export function formattedPhoneNumber(phoneNumber) {
  if (!phoneNumber) {
    return null;
  }

  const number = String(phoneNumber);
  const areaCode = number.slice(0, 3);
  const firstGroup = number.slice(3, 6);
  const lastGroup = number.slice(6, 10);

  return `(${areaCode}) ${firstGroup}-${lastGroup}`;
}