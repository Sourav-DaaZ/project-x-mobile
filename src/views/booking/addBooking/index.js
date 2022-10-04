import React, { useContext, useState, useEffect } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'styled-components';
import Input from '../../../sharedComponents/input';
import { validate, dateFormat, timeFormat } from '../../../utils';
import validation from '../../../constants/validationMsg';
import InsideAuthApi from '../../../services/inSideAuth';
import { useDispatch } from 'react-redux';
import { snackbarUpdate } from '../../../store/actions';
import { useSelector, shallowEqual } from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker'

import {
  SubmitButton,
  InputView,
  StyledScrollView,
  StyledInlineInput,
} from './style';
import { ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';

const AddBooking = (props) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth, shallowEqual);
  const colors = themeContext.colors[themeContext.baseColor];
  const spacing = themeContext.spacing;

  const [loader, setLoader] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [open, setOpen] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reportingDetails, setReportingDetails] = useState('');
  const [description, setDescription] = useState('');

  const createBookFnc = () => {
    if (!validate(description, { required: true })) {
      dispatch(snackbarUpdate({
        type: 'error',
        msg: validation.validateField()
      }))
    } else {
      const requestData = {
        user_id: props.route.params?.id ? props.route.params.id : '',
        description: description,
        startDate: startDate,
        endDate: endDate,
        reportingDetails: reportingDetails
      }
      setLoader(true);
      InsideAuthApi(authStore)
        .addBookingApi(requestData)
        .then((res) => {
          setLoader(false);
          dispatch(snackbarUpdate({
            type: 'success',
            msg: res.message
          }));
          props.navigation.goBack();
        })
        .catch((err) => {
          setLoader(false);
          dispatch(snackbarUpdate({
            type: 'error',
            msg: err?.message ? err.message : ''
          }))
        });
    }
  }


  return (
    <ShadowWrapperContainer {...props}>
      <StyledScrollView>
        <InputView>
          <Input
            title={"Description"}
            placeholder={'Add Description'}
            onInputChange={(val) => setDescription(val)}
            onSubmit={() => Keyboard.dismiss()}
            value={description}
            icons={[]}
            ele={'input'}
          />
          <StyledInlineInput>
            <TouchableOpacity onPress={() => setOpen(1)} style={{ width: '48%' }}>
              <Input
                title={"Start Date"}
                placeholder={'Enter Start Date'}
                value={dateFormat(startDate)}
                editable={false}
                icons={[
                  <FontAwesome name="calendar" color="#05375a" size={spacing.width * 5} />
                ]}
                ele={'input'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOpen(2)} style={{ width: '48%', marginLeft: "2%" }}>
              <Input
                title={"End Date"}
                placeholder={'Enter End Date'}
                value={dateFormat(endDate)}
                editable={false}
                icons={[
                  <FontAwesome name="calendar" color="#05375a" size={spacing.width * 5} />
                ]}
                ele={'input'}
              />
            </TouchableOpacity>
          </StyledInlineInput>
          <Input
            title={"Reporting Details"}
            placeholder={'Enter Reporting Details'}
            onInputChange={(val) => setReportingDetails(val)}
            onSubmit={() => Keyboard.dismiss()}
            value={reportingDetails}
            icons={[]}
            ele={'input'}
          />
        </InputView>
        <SubmitButton labelStyle={{ color: colors.backgroundColor }} mode='contained' loading={loader} onPress={!loader ? createBookFnc : null}>
          Create Booking
        </SubmitButton>
      </StyledScrollView>
      <DatePicker
        modal
        mode={"datetime"}
        open={open > 0 && open < 4}
        date={new Date()}
        minimumDate={open === 1 ? new Date : open === 2 ? startDate : null}
        onConfirm={(date) => {
          if (open == 1) {
            setStartDate(date);
            setEndDate(date);
          } else if (open == 2) {
            setEndDate(date);
          }
          setOpen(0)
        }}
        onCancel={() => {
          setOpen(0)
        }}
      />
    </ShadowWrapperContainer>
  );
};

export default AddBooking;