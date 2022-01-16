class API {
	static baseURL = "http://127.0.0.1:8000/api/";
	static login   = this.baseURL + "login";
	static verifyEmail   = this.baseURL + "EmailVerification";
	static GetOTPExpiration   = this.baseURL + "GetOTPExpiration";
	static OTPVerification   = this.baseURL + "OTPVerification";
	static ResetPassword   = this.baseURL + "ResetPassword";
	static ChangePassword   = this.baseURL + "ChangePassword";
	static GetUserProfile   = this.baseURL + "GetUserProfile";
	static UpdateProfile   = this.baseURL + "UpdateProfile";
	static GetDailyMealItem   = this.baseURL + "GetDailyMealItem";
	static SendMessage   = this.baseURL + "SendMessage";
	
}
export default API;