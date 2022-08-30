export const API = {
  currentEnv: 'dev',
  baseUrls: {
    dev: 'http://192.168.0.103:5000/api',
    // dev: 'https://yarifi-backend.herokuapp.com/api',
    qa: '',
    uat: '',
    prod: '',
  },
  noAuthUrls: {
    login: '/login',
    otpVerify: '/user_varification',
    requestForChangePassword: '/request_for_change_password',
    userIdCheck: '/user_id_check',
    registerUser: '/register_user',
    changePassword: '/change_password',
    userDetails: '/user_details',
    categoryList: '/category_list',
    searchPost: '/search_post',
    getPosts: '/get_posts',
    postSocket: '/post',
    tagSocket: '/tag',
    globalChatSocket: '/globalChat',
    ChatSocket: '/chat',
    tagList: '/tag_list',
    getPostDetails: '/get_post_details',
    allUser: '/all_user',
    searchUser: '/search_user',
    socialLogin: '/social_login',
    appConfig: '/app_config',
    myNotification: '/my_notification',
    getReviewForOther: '/get_review_for_other',
    bookingListForAll: '/booking_list_for_all',
    bookingListForAll: '/booking_list_for_all',
    refreshToken: '/refresh_token',
    getBanner: '/get_banner',
    firebaseToken: '/firebase_token',
  },
  authUrls: {
    createCategory: '/create_category',
    editCategory: '/edit_category',
    bannerAdd: '/banner_add',
    bannerUpdate: '/banner_update',
    details: '/details',
    createPost: '/create_post',
    updatePost: '/update_post',
    getMyPost: '/get_my_post',
    logout: '/logout',
    updateDetails: '/update_details',
    createApplication: '/create_application',
    getAllApplications: '/get_all_applications',
    getApplicationDetails: '/get_application_details',
    updateApplication: '/update_application',
    getReview: '/get_review',
    createReview: '/create_review',
    updateLocation: '/update_location',
    addTag: '/add_tag',
    editTag: '/edit_tag',
    saveTag: '/save_tag',
    getSaveTag: '/get_save_tag',
    bookingList: '/booking_list',
    addBooking: '/add_booking',
    editBooking: '/edit_booking',
    editReview: '/edit_review',
    myChatList: '/my_chat_list',
    changeUserid: 'change_userid'
  },
};
