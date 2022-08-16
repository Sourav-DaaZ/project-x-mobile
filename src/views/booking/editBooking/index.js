import React, { useContext, useState } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'styled-components';
import Input from '../../../sharedComponents/input';
import { validate, dateFormat, timeFormat } from '../../../utils';
import validation from '../../../constants/validationMsg';
import InsideAuthApi from '../../../services/inSideAuth';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate } from '../../../store/actions';
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

const EditBooking = (props) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth, shallowEqual);
  const detailsStore = useSelector((state) => state.details, shallowEqual);
  const colors = themeContext.colors[themeContext.baseColor];

  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(0);
  const [startDate, setStartDate] = useState(props.route.params?.data?.startDate ? new Date(props.route.params.data.startDate) : new Date());
  const [endDate, setEndDate] = useState(props.route.params?.data?.endDate ? new Date(props.route.params.data.endDate) : new Date());
  const [time, setTime] = useState(props.route.params?.data?.reportTime ? new Date(props.route.params.data.reportTime) : new Date());
  const [description, setDescription] = useState(props.route.params?.data?.description ? props.route.params.data.description : '');

  const editBookFnc = () => {
    console.log(description);
    if (!validate(description, { required: true })) {
      dispatch(SnackbarUpdate({
        type: 'error',
        msg: validation.validateField()
      }))
    } else {
      const requestData = {
        id: props.route.params?.data?._id ? props.route.params.data._id : '',
        description: description,
        startDate: startDate,
        endDate: endDate,
        reportTime: time
      }
      setLoader(true);
      InsideAuthApi(authStore)
        .editBookinggApi(requestData)
        .then((res) => {
          setLoader(false);
          dispatch(SnackbarUpdate({
            type: 'success',
            msg: res.message
          }));
          props.navigation.goBack();
        })
        .catch((err) => {
          setLoader(false);
          dispatch(SnackbarUpdate({
            type: 'error',
            msg: err?.message ? err.message : ''
          }))
        });
    }
  }


  return (
    <ShadowWrapperContainer>
      <StyledScrollView>
        <InputView>
          <Input
            title={"Description"}
            placeholder={'Add Description'}
            onInputChange={(val) => setDescription(val)}
            onSubmit={() => Keyboard.dismiss()}
            value={description}
            icons={[
              <FontAwesome name="user-o" color="#05375a" size={20} />
            ]}
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
                  <FontAwesome name="user-o" color="#05375a" size={20} />
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
                  <FontAwesome name="user-o" color="#05375a" size={20} />
                ]}
                ele={'input'}
              />
            </TouchableOpacity>
          </StyledInlineInput>
          <TouchableOpacity onPress={() => setOpen(3)}>
            <Input
              title={"Reporting Time"}
              placeholder={'Enter Reporting Time'}
              value={timeFormat(time)}
              editable={false}
              icons={[
                <FontAwesome name="user-o" color="#05375a" size={20} />
              ]}
              ele={'input'}
            />
          </TouchableOpacity>
        </InputView>
        <SubmitButton labelStyle={{ color: colors.backgroundColor }} mode='contained' loading={loader} onPress={!loader ? editBookFnc : null}>
          Edit Booking
        </SubmitButton>
      </StyledScrollView>
      <DatePicker
        modal
        mode={open === 3 ? "time" : "date"}
        open={open > 0 && open < 4}
        date={open === 3 ? time : startDate}
        minimumDate={open !== 3 ? startDate : null}
        onConfirm={(date) => {
          console.log(date)
          if (open == 1) {
            setStartDate(date);
            setEndDate(date);
          } else if (open == 2) {
            setEndDate(date);
          } else if (open == 3) {
            setTime(date)
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

export default EditBooking;