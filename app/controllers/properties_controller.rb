class PropertiesController < ApplicationController
  before_action :set_property, only: [:show]

  def index
    @properties = Property.all
    if params[:city].present?
      address_ids = Address.where(city: params[:city]).pluck(:id)
      @properties = Property.where(address_id: address_ids)
    end

    @properties = @properties.where("LOWER(title) LIKE ? or LOWER(description) LIKE ?", "%#{params[:filter].downcase}%", "%#{params[:filter].downcase}%") if params[:filter].present?
  end

  def show
  end

  private
  def set_property
    @property = Property.find_by_id(params[:id])
  end
end