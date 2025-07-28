class Auth::PropertiesController < AuthController
  def index
  end

  def show
  end

  def new
  end

  def create
  end

  def edit
  end

  def update
  end

  def delete
  end

  private
  def set_property
    @property = current_user.properties.find(params[:id])
  end

  def property_params
    params.require(:property).permit(:title, :description, :price, :active)
  end
end