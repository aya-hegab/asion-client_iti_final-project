import React from 'react'

const Services = () => {
  return (
    <>
      <section className="services spad">
    <div className="container">
        <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="services__item">
                    <i className="fa fa-car"></i>
                    <h6>Free Shipping</h6>
                    <p>For all oder over $99</p>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="services__item">
                    <i className="fa fa-money"></i>
                    <h6>Money Back Guarantee</h6>
                    <p>If good have Problems</p>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="services__item">
                    <i className="fa fa-support"></i>
                    <h6>Online Support 24/7</h6>
                    <p>Dedicated support</p>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="services__item">
                    <i className="fa fa-headphones"></i>
                    <h6>Payment Secure</h6>
                    <p>100% secure payment</p>
                </div>
            </div>
        </div>
    </div>
</section>
    </>
  )
}

export default Services
