class Auth::UsersController < AuthController
  private
  def set_user
    @user = current_user.properties.find(params[:id])
  end
end