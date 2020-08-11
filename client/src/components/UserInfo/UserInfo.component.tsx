import React, { useState } from 'react'

interface Props {

}
interface Event {
  target: {
    name: string, value: string
  }
}

const UserInfo = (props: Props) => {
  const [disabled, setDisabled] = useState(true);
  const [{
    fullName,
    telephone,
    email,
    city,
    primaryAddress,
    codPostal_1,
    secondaryAddress,
    codPostal_2
  }, setUserDetails] = useState({
    fullName: "Adi",
    telephone: "555-555-5555",
    email: "adi@example.com",
    city: "San Francisco",
    primaryAddress: "123 Main St",
    codPostal_1: "700319",
    secondaryAddress: "122 Main St",
    codPostal_2: "700318",
  });

  function handleTextFieldChange({ target: { name, value } }: Event) {
    setUserDetails(prevState => ({ ...prevState, [name]: value }));
  }

  const DetailsInput = (type: string, id: string, name: string, placeholder: string, disabled: boolean, value: string) => (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={event => handleTextFieldChange(event)}
    />
  )
  return (
    <div>
      <button onClick={() => setDisabled(!disabled)}>Edit</button>
      <form id="userPersonalDataForm">
        {DetailsInput("text", "FullNameInput", "fullName", "Full Name", disabled, fullName)}
        {DetailsInput("tel", "phoneInput", "telephone", "Telephone", disabled, telephone)}
        {DetailsInput("text", "emailInput", "email", "Email", disabled, email)}
        {DetailsInput("text", "cityInput", "city", "City", disabled, city)}
        {DetailsInput("text", "primaryAddressInput", "primaryAddress", "Primary Address", disabled, primaryAddress)}
        {DetailsInput("text", "codPostalInput-1", "codPostal_1", "Cod Postal-1", disabled, codPostal_1)}
        {DetailsInput("text", "secondaryAddressInput", "secondaryAddress", "Secondary Address", disabled, secondaryAddress)}
        {DetailsInput("text", "codPostalInput-2", "codPostal_2", "Cod Postal-2", disabled, codPostal_2)}
      </form>
    </div>
  )
}

export default UserInfo
