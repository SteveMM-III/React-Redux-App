import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchNasa } from '../actions';
import styled from 'styled-components';

const StyledContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    color: white;
`;

const StyledImg = styled.img`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -3;
`;

const StyledH1 = styled.h1`
    margin: 1rem auto;
    padding: 0.4rem;
    border-radius: 0.3rem;
    background-color: rgba( 5, 5, 5, 0.5 );
`;

const StyledH3 = styled.h3`
    margin: 1rem auto;
    padding: 0.4rem;
    border-radius: 0.3rem;
    background-color: rgba( 5, 5, 5, 0.5 );
`;

const StyledInfo = styled.div`
    position: fixed;
    bottom: 3rem;
    left: calc(50% - 2rem);
    padding: 0.5% 2%;
    line-height: 1.5rem;
    border-radius: 1rem;
    background-color: rgba( 5, 5, 5, 0.5 );
    &:hover {
        cursor: pointer;
    }
    ${props => {  // set up the toggle that is set by the onClick on line 118
        if (props.toggle) { // if true
            return `
                width: 60%;
                left: 20%;
            `;
        } else {            // if false
            return `
                left: calc(50% - 2rem);
            `;
        }
    } }
`;

const StyledH4 = styled.h4`
    width: 100%;
    margin: 0;
    ${props => {  // set up the toggle that is set by the onClick on line 119
        if (props.toggle) { // if true
            return `
                display: block;
            `;
        } else {            // if false
            return `
                display: none;
            `;
        }
    } }
`;

const StyledP = styled.p`
    text-align: start;
    ${props => {  // set up the toggle that is set by the onClick on line 120
        if (props.toggle) { // if true
            return `
                display: block;
            `;
        } else {            // if false
            return `
                display: none;
            `;
        }
    } }
`;

const NasaImage = props => {
  const [infoWidth, setInfoWidth] = useState(false);
  const [showH4,    setShowH4   ] = useState(true );
  const [showInfo,  setShowInfo ] = useState(false);

  useEffect( () => {
    props.dispatch( fetchNasa() );
  }, [] ); 


  return (
    <>
      { props.isFetching && <div>loading...</div> }
      { props.error && <div>{ props.error.message }</div>}
      
        
        <StyledContainer>
            <StyledImg alt='nasa hd image of the day' src={ props.nasa.hdurl } />
            <StyledH1>{ props.nasa.title }</StyledH1>
            <StyledH3>{ props.nasa.date  }</StyledH3>
            <StyledInfo toggle={ infoWidth }        // watch infoWidth useState for change
                onClick={ () => {
                    setInfoWidth( !infoWidth );       // toggle true/false
                    setShowH4( !showH4 );             // toggle true/false
                    setShowInfo( !showInfo );         // toggle true/false
                } } >
                <StyledH4 toggle={ showH4 }>INFO</StyledH4>
                <StyledP toggle={ showInfo }>{ props.nasa.explanation }</StyledP>
            </StyledInfo>
        </StyledContainer>
      
    </>
  );
};

const mapDispatchToProps = {
  fetchNasa
};

export default connect( state => state )( NasaImage );
