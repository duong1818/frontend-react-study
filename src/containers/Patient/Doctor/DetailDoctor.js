import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import './DetailDoctor.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import { userService } from '../../../services';
import { CommonUtils, LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';

class DetailDoctor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            detailDoctor: {}

        }
    }

    async componentDidMount() {

        if(this.props.match && this.props.match.params && this.props.match.params.id) {

            let res = await userService.getDetailDoctor(this.props.match.params.id);
            

 
            if(res && res.errCode === 0){
                this.setState({
                    detailDoctor: res.inforDoctor
                })

            }
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        let {detailDoctor} = this.state;

        let nameVi = '', nameEn = ''; 
        if(detailDoctor && detailDoctor.positionData){
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        
        return (
            <div className='doctor-detail-screen'> 
                <HomeHeader isShowBanner={false}/>
                <div className="doctor-detail-container">
                    <div className='intro-doctor'>
                       <div className='content-left' style={{backgroundImage: `url(${detailDoctor && detailDoctor.image? detailDoctor.image : ''})`}}></div> 
                       <div className='content-right'>
                           <div className='up'>
                                {this.props.language === LANGUAGES.VI ? nameVi?nameVi:'' : nameEn?nameEn:''}
                           </div>
                           <div className='down' >{detailDoctor && detailDoctor.doctorInformation && detailDoctor.doctorInformation.description && 
                                <span>{detailDoctor.doctorInformation.description}</span>
                           }</div>

                       </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule doctorId={detailDoctor && detailDoctor.id ? detailDoctor.id : -1}/>
                        </div>
                        <div className='content-right'>
                            <DoctorExtraInfor doctorId={detailDoctor && detailDoctor.id ? detailDoctor.id : -1}/>
                        </div>
                    </div>
                    <div className='detail-infor-doctor'>
                        {detailDoctor && detailDoctor.doctorInformation && detailDoctor.doctorInformation.contentHTML &&
                           <div dangerouslySetInnerHTML={{ __html: detailDoctor.doctorInformation.contentHTML }}></div>
                        }
                    </div>
                    <div className='comment-doctor'></div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);