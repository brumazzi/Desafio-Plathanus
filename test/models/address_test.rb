require "test_helper"

class AddressTest < ActiveSupport::TestCase
  setup do
    @address = addresses(:one)
  end

  test "Address not valid, coutry is nil" do
    @address.coutry = nil
    assert @address.valid? == false
  end

  test "Address not valid, state is nil" do
    @address.state = nil
    assert @address.valid? == false
  end

  test "Address not valid, uf is nil" do
    @address.uf = nil
    assert @address.valid? == false
  end

  test "Address not valid, city is nil" do
    @address.city = nil
    assert @address.valid? == false
  end

  test "Address not valid, district is nil" do
    @address.district = nil
    assert @address.valid? == false
  end

  test "Address valid" do
    assert @address.valid? == true
  end
end