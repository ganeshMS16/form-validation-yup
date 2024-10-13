import { useState } from "react"
import * as Yup from 'yup'

function Form_Validation() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: [],
    birthDate: "",
  })

const [errors,setErrors]=useState({})

  let userSchema = Yup.object({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    phoneNumber: Yup.string().matches(/^\d{10}$/, "phone number is not valid").required("phone number required"),
    email: Yup.string().email("invalid email").required("provide email"),
    password: Yup.string().min(8, "password must be minimum of 8 char").required("password required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "passwords do not match").required("confirm password missing"),
    age: Yup.number().typeError("age should be in number").min(6, "age should be greater than one").max(100, "invalid age"),
    gender: Yup.string().required("gender is required"),
    interests: Yup.array().min(1, "select min one").required(),
    birthDate: Yup.string().required("birth of date required")
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    try{
      await userSchema.validate(formData,{abortEarly:false})//abortEarly:will throw all the errors after encountering first error instead of breaking the promise for first error
      console.log("submitted successfully ",formData)
    }catch(error){
      const newError={};
      error.inner.forEach((err)=>{
        newError[err.path]=err.message;
      })
      setErrors(newError)
    }
    
  }

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleChangeChecked = (e) => {
    const { name, checked } = e.target;
    console.log(`${name} is ${checked ? "checked" : "unchecked"}`)
    let updatedInterests = [...formData.interests]
    if (checked) {
      updatedInterests.push(name)
    } else {
      updatedInterests = updatedInterests.filter((interest) => interest !== name)
    }

    //* example
    //  updatedInterests = ["Music", "Travel", "Sports"].filter(
    //   (interest) => interest !== "Travel"
    // );
    setFormData((prevData) => ({
      ...prevData,
      interests: updatedInterests,
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name : </label>
        <input type="text" name="firstName" value={formData.firstName} placeholder="first name" onChange={onChangeHandle} />
      {errors.firstName && <p className="error-style">{errors.firstName}</p>}
      </div>
      <div>
        <label>last name : </label>
        <input type="text" name="lastName" value={formData.lastName} placeholder="last name" onChange={onChangeHandle} />
        {errors.lastName && <p className="error-style">{errors.lastName}</p>}
      </div>
      <div>
        <label>phone number : </label>
        <input type="tel" name="phoneNumber" value={formData.phoneNumber} placeholder="phone number" onChange={onChangeHandle} />
        {errors.phoneNumber && <p className="error-style">{errors.phoneNumber}</p>}
      </div>
      <div>
        <label>email : </label>
        <input type="email" name="email" value={formData.email} placeholder="email" onChange={onChangeHandle} />
        {errors.email && <p className="error-style">{errors.email}</p>}
      </div>
      <div>
        <label>password : </label>
        <input type="password" name="password" value={formData.password} placeholder="password" onChange={onChangeHandle} />
        {errors.password && <p className="error-style">{errors.password}</p>}
      </div>
      <div>
        <label>confirm password : </label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} placeholder="confirm password" onChange={onChangeHandle} />
        {errors.confirmPassword && <p className="error-style">{errors.confirmPassword}</p>}
      </div>
      <div>
        <label>age : </label>
        <input type="number" name="age" value={formData.age} placeholder="age" onChange={onChangeHandle} />
        {errors.age && <p className="error-style">{errors.age}</p>}
      </div>
      <div>
        <label value={formData.gender} >Gender</label>
        <select name="gender" id="gender" onChange={onChangeHandle}>
          <option value="">select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </select>
        {errors.gender && <p className="error-style">{errors.gender}</p>}
      </div>
      <div>
        <label>Interests :</label>
        <label>
          <input type="checkbox" name="JS" value={formData.interests.includes("JS")} onChange={handleChangeChecked} />
          JS
        </label>
        <label >
          <input type="checkbox" name="React Js" value={formData.interests.includes("React Js")} onChange={handleChangeChecked} />
          React Js
        </label>
        <label >
          <input type="checkbox" name="Node Js" value={formData.interests.includes("Node Js")} onChange={handleChangeChecked} />
          Node Js
        </label>
        {errors.interests && <p className="error-style">{errors.interests}</p>}
      </div>
      <div>
        <label>Date Of Birth : </label>
        <input type="date" value={formData.birthDate} name="birthDate" onChange={onChangeHandle} />
        {errors.birthDate && <p className="error-style">{errors.birthDate}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form_Validation
