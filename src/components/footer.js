import React, {Component,Fragment} from 'react';

class Footer extends Component {
    state = {
        date : new Date().getFullYear()
    }
    render() {
        const {date} = this.state;
        return (
            <Fragment>
                        <div className="w-100 footer p-2">
                            <span className="text-warning">&copy;Copyright {date}-{date+1}</span>
                            <p className="product-name text-white no-print">All Rights Reserved By Md Anwar Hossain</p>
                        </div>
            </Fragment>
        );
    }
}

export default Footer;