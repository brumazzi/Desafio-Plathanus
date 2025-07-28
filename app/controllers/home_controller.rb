class HomeController < ApplicationController
  def index
    @addresses_cities = Address.all.distinct.pluck(:city)

    @properties_news = Property.all.order(created_at: :desc).limit(9)
  end
end