import React from 'react'

export default ({ children }) =>
    <section className="content__main u-fill-neutral-readable">
        <div className="u-container-lg u-section-sm u-block-xl">
            <div className="grid">
                <div className="g-col-sm-10 g-col-md-9 g-col-lg-8">
                    {children}
                </div>
            </div>
        </div>
    </section>
