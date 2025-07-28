require "test_helper"

class TagTest < ActiveSupport::TestCase
  setup do
    @tag = tags(:one)
  end

  test "Tag valid" do
    assert @tag.valid? == true
  end

  test "Tag not valid" do
    @tag.name = nil
    assert @tag.valid? == false
  end


end
