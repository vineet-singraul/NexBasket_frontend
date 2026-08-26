/* eslint-disable @typescript-eslint/no-explicit-any */
// const NAME_REGEX = /^[A-Za-z]{2,30}$/
// const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// const MOBILE_REGEX = /^[6-9]\d{9}$/
// const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

// export const validateField = (name: string, value: string): string => {
//   const trimmed = value.trim()

//   switch (name) {
//     case 'firstName':
//     case 'lastName':
//       if (!trimmed) return `${name === 'firstName' ? 'First' : 'Last'} name is required`
//       if (!NAME_REGEX.test(trimmed)) return 'Only letters are allowed (2-30 characters)'
//       return ''

//     case 'email':
//       if (!trimmed) return 'Email is required'
//       if (!EMAIL_REGEX.test(trimmed)) return 'Enter a valid email address'
//       return ''

//     case 'mobile':
//       if (!trimmed) return 'Mobile number is required'
//       if (!MOBILE_REGEX.test(trimmed)) return 'Enter a valid 10-digit mobile number'
//       return ''

//     case 'password':
//       if (!trimmed) return 'Password is required'
//       if (!PASSWORD_REGEX.test(trimmed))
//         return 'Password must be 8+ characters with uppercase, lowercase, number and special character'
//       return ''

//     case 'identifier':
//       if (!trimmed) return 'Email or mobile number is required'
//       if (!EMAIL_REGEX.test(trimmed) && !MOBILE_REGEX.test(trimmed))
//         return 'Enter a valid email or 10-digit mobile number'
//       return ''

//     case 'oldPassword':
//     case 'newPassword':
//     case 'confirmPassword':
//       if (!trimmed) return 'Password is required'
//       if (!PASSWORD_REGEX.test(trimmed))
//         return 'Password must be 8+ characters with uppercase, lowercase, number and special character'
//       return ''

//     default:
//       return ''
//   }
// }

const NAME_REGEX = /^[A-Za-z\s]{2,30}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MOBILE_REGEX = /^[6-9]\d{9}$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/
const PINCODE_REGEX = /^[1-9][0-9]{5}$/
const URL_REGEX = /^https?:\/\/.+$/i

export const validateField = (name: string, value: string): string => {
  const trimmed = value.trim()

  switch (name) {
    // User Fields
    case 'firstName':
    case 'lastName':
      if (!trimmed) return `${name === 'firstName' ? 'First' : 'Last'} name is required`
      if (!NAME_REGEX.test(trimmed)) return 'Only letters are allowed (2-30 characters)'
      return ''

    case 'email':
      if (!trimmed) return 'Email is required'
      if (!EMAIL_REGEX.test(trimmed)) return 'Enter a valid email address'
      return ''

    case 'mobile':
      if (!trimmed) return 'Mobile number is required'
      if (!MOBILE_REGEX.test(trimmed)) return 'Enter a valid 10-digit mobile number'
      return ''

    case 'password':
      if (!trimmed) return 'Password is required'
      if (!PASSWORD_REGEX.test(trimmed))
        return 'Password must be 8+ characters with uppercase, lowercase, number and special character'
      return ''

    case 'identifier':
      if (!trimmed) return 'Email or mobile number is required'
      if (!EMAIL_REGEX.test(trimmed) && !MOBILE_REGEX.test(trimmed))
        return 'Enter a valid email or 10-digit mobile number'
      return ''

    case 'oldPassword':
    case 'newPassword':
    case 'confirmPassword':
      if (!trimmed) return 'Password is required'
      if (!PASSWORD_REGEX.test(trimmed))
        return 'Password must be 8+ characters with uppercase, lowercase, number and special character'
      return ''

    // Store Fields
    case 'owner':
      if (!trimmed) return 'Owner is required'
      return ''

    case 'storeName':
      if (!trimmed) return 'Store name is required'
      if (trimmed.length < 3) return 'Store name must be at least 3 characters'
      return ''

    case 'logo':
      if (trimmed && !URL_REGEX.test(trimmed)) return 'Enter a valid logo URL'
      return ''

    case 'banner':
      if (trimmed && !URL_REGEX.test(trimmed)) return 'Enter a valid banner URL'
      return ''

    case 'description':
      if (!trimmed) return 'Description is required'
      if (trimmed.length < 10) return 'Description should be at least 10 characters'
      return ''

    case 'phone':
      if (!trimmed) return 'Phone number is required'
      if (!MOBILE_REGEX.test(trimmed)) return 'Enter a valid 10-digit phone number'
      return ''

    case 'gstNumber':
      if (!trimmed) return 'GST Number is required'
      if (!GST_REGEX.test(trimmed)) return 'Enter a valid GST Number'
      return ''

    case 'address.street':
      if (!trimmed) return 'Street is required'
      return ''

    case 'address.city':
      if (!trimmed) return 'City is required'
      if (!NAME_REGEX.test(trimmed)) return 'Enter a valid city'
      return ''

    case 'address.state':
      if (!trimmed) return 'State is required'
      if (!NAME_REGEX.test(trimmed)) return 'Enter a valid state'
      return ''

    case 'address.country':
      if (!trimmed) return 'Country is required'
      if (!NAME_REGEX.test(trimmed)) return 'Enter a valid country'
      return ''

    case 'address.pincode':
      if (!trimmed) return 'Pincode is required'
      if (!PINCODE_REGEX.test(trimmed)) return 'Enter a valid 6-digit pincode'
      return ''

    case 'rating':
      if (trimmed && Number(trimmed) < 0) return 'Rating cannot be negative'
      return ''

    case 'totalSales':
      if (trimmed && Number(trimmed) < 0) return 'Total sales cannot be negative'
      return ''
    case 'active':
      if (!trimmed) return 'Country is required'
      if (!NAME_REGEX.test(trimmed)) return 'Enter a valid country'
      return ''

    case 'store':
      if (!trimmed) return 'Store is required'
      return ''

    case 'category':
      if (!trimmed) return 'category is required'
      return ''

    case 'name':
      if (!trimmed) return ` name is required`
      if (!NAME_REGEX.test(trimmed)) return 'Only letters are allowed (2-30 characters)'
      return ''

    case 'brand':
      if (!trimmed) return ` brand is required`
      if (!NAME_REGEX.test(trimmed)) return 'Only letters are allowed (2-30 characters)'
      return ''

    case 'price':
      if (!trimmed) return ` Price is required`
      return ''

    case 'mrp':
      if (!trimmed) return ` MRP is required`
      return ''

    case 'weight':
      if (!trimmed) return ` weight is required`
      return ''

    case 'warrantyPeriod':
      if (!trimmed) return ` warranty Period is required`
      return ''

    case 'discountPercent':
      if (!trimmed) return ` discount Percent Period is required`
      return ''

    case 'stock':
      if (!trimmed) return ` discount Percent Period is required`
      return ''

    case 'sku':
      if (!trimmed) return ` sku is required`
      return ''

    case 'tags':
      if (!trimmed) return ` tags is required`
      return ''

    case 'length':
    case 'width':
    case 'height':
      if (!trimmed) return ` filed is required`
      return ''

    case 'createdAt':
    case 'updatedAt':
      return ''

    default:
      return ''
  }
}








// Validate the Image
export const IsImageValidate = (data: any) => {

  if (!data) return false

  const extension = data.name
    .substring(data.name.lastIndexOf('.'))
    .toLowerCase()

  if (
    extension !== '.png' &&
    extension !== '.jpg' &&
    extension !== '.jpeg'
  ) {
    console.log("< invalid image >")

    return "please upload valid image"
  } 

  console.log("< valid image >")

  return extension
}