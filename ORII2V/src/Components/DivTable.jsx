import React from 'react'

const DivTable = ({children,col, off, clasLoad,classTable}) => {
  return (
    <div className='row mt-3'>
        <div className={'col-md-'+col+ 'offset-md-'+off}>
            <div className={'card border border-white text-center'+clasLoad}>
              <div className='card-body'>
                <img src= '/loading.GF' className='img-fluid'></img>
              </div>
            </div>
            <div className={'table-responsive'+classTable}>
                {children}
            </div>
        </div>
    </div>
  )
}

export default DivTable