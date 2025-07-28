require "test_helper"

class PropertyTest < ActiveSupport::TestCase
  fixtures :users, :properties

  setup do
    @property = properties(:one)

    f1 = File.open("test/fixtures/files/image-01.jpg")
    f2 = File.open("test/fixtures/files/image-02.jpg")
    f3 = File.open("test/fixtures/files/image-03.jpg")
    f4 = File.open("test/fixtures/files/image-04.jpg")
    f5 = File.open("test/fixtures/files/image-05.jpg")

    @property.images.attach(io: f1, filename: "image-test-01.jpg", content_type: 'image/png')
    @property.images.attach(io: f2, filename: "image-test-02.jpg", content_type: 'image/png')
    @property.images.attach(io: f3, filename: "image-test-03.jpg", content_type: 'image/png')
    @property.images.attach(io: f4, filename: "image-test-04.jpg", content_type: 'image/png')
    @property.images.attach(io: f5, filename: "image-test-05.jpg", content_type: 'image/png')
  end

  test "Propert not valid, don't have image" do
    @property.images_attachment_ids = []
    assert @property.valid? == false
  end

  test "Propert not valid, have more than 5 images" do
    @property.images.attach(io: File.open("test/fixtures/files/image-06.jpg"), filename: "house-1.png", content_type: 'image/png')
    assert @property.valid? == false
  end

  test "Propert not valid, title is nil" do
    @property.title = nil
    assert @property.valid? == false
  end

  test "Propert not valid, description is nil" do
    @property.description = nil
    assert @property.valid? == false
  end

  test "Propert not valid, price is nil" do
    @property.price = nil
    assert @property.valid? == false
  end

  test "Propert not valid, user is nil" do
    @property.user = nil
    assert @property.valid? == false
  end

  test "Propert not valid, address is nil" do
    @property.address = nil
    assert @property.valid? == false
  end

  test "Propert valid, don't have image" do
    assert @property.valid? == true
  end
end
