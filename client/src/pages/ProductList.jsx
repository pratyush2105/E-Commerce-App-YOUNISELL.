import React, { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../Components/Navbar'
import Announcements from '../Components/Announcements'
import Products from '../Components/Products'
import Newsletter from '../Components/Newsletter'
import Footer from '../Components/Footer'
import { mobile } from '../Responsive'
import { useLocation } from 'react-router-dom'
 
const Container = styled.div``

const Title = styled.h1`
  margin: 20px;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Filter = styled.div`
  margin: 20px;
  ${mobile({width: "0px 20px", display: "flex", flexDirection: "column"})}
`

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin: 20px;
  ${mobile({marginRight: "0px"})}
`

const Select = styled.select`
  margin-right: 20px;
  padding: 10px;
  cursor: pointer;
  ${mobile({margin: "10px 0px"})}
`
const Option = styled.option``

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split('/')[2];//we use what is 2nd after / in URL i.e. cat(eg: men).
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  
  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value
    });
  };

  return (
    <Container>
      <Navbar />
      <Announcements />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name = "color" onChange={handleFilters}>
            <Option disabled>
              Color
            </Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name = "size" onChange={handleFilters}>
            <Option disabled>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
            <Option>XXL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={e=>setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (Asc)</Option>
            <Option value="desc">Price (Desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort}/> 
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default ProductList