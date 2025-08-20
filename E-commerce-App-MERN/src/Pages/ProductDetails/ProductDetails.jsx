import Breadcrumbs from "@mui/material/Breadcrumbs";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import ProductZoom from "../../components/ProductZoom/ProductZoom";
import Button from "@mui/material/Button";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";

function ProductDetails() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <div className="py-5 ">
        <div className="container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition !text-[14px]"
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition !text-[14px]"
            >
              Fashion
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition !text-[14px]"
            >
              Cropped Satin Bomber Jacket
            </Link>
          </Breadcrumbs>
        </div>
      </div>

      <section className="bg-white py-5 ">
        <div className="container flex gap-8 items-center">
          <div className="productZoomContainer w-[30%]  ">
            <ProductZoom />
          </div>

          <div className="productContent w-[70%] pr-10 pl-10 ">
            <ProductDetailsComponent />
          </div>
        </div>

        <div className="container pt-10">
          <div className="flex items-center gap-8 mb-5">
            <span
              className={`link text-[17px] cursor-pointer font-[500] ${
                activeTab === 0 && "text-primary"
              }`}
              onClick={() => setActiveTab(0)}
            >
              Description
            </span>
            <span
              className={`link text-[17px] cursor-pointer font-[500] ${
                activeTab === 1 && "text-primary"
              }`}
              onClick={() => setActiveTab(1)}
            >
              Products Detail
            </span>
            <span
              className={`link text-[17px] cursor-pointer font-[500] ${
                activeTab === 2 && "text-primary"
              }`}
              onClick={() => setActiveTab(2)}
            >
              Review(5)
            </span>
          </div>

          {activeTab === 0 && (
            <div className="shadow-md w-full py-5 px-8 rounded-md">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga
                debitis eligendi corrupti reprehenderit officiis error placeat
                natus, inventore quaerat! Aut sit a beatae. Vero facere,
                similique error explicabo debitis laudantium!
              </p>
              <h4>Lightweight Design</h4>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius
                modi ullam fugit laudantium. Veniam, nostrum, magnam excepturi
                incidunt, modi recusandae fugit vel dolorem perspiciatis amet
                officia neque accusamus obcaecati officiis.
              </p>
              <h4>Free Shipping & Return</h4>
              <p>
                Lorem ipsumaudantium, accusamus inventore? Facere hic expedita
                recusandae soluta earum.
              </p>
              <h4>Money Back Guarantee</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                quae asperiores iste odit aliquam distinctio natus maiores
                blanditiis dolore!
              </p>
              <h4>Online Support</h4>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Molestiae illum i!
              </p>
            </div>
          )}
          {activeTab === 1 && (
            <div className="shadow-md w-full py-5 px-8 rounded-md">
              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Product name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Color
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Category
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td class="px-6 py-4 font-[500]">Silver</td>
                      <td class="px-6 py-4  font-[500]">Silver</td>
                      <td class="px-6 py-4  font-[500]">Laptop</td>
                      <td class="px-6 py-4  font-[500]">$2999</td>
                    </tr>{" "}
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td class="px-6 py-4 font-[500]">Silver</td>
                      <td class="px-6 py-4  font-[500]">Silver</td>
                      <td class="px-6 py-4  font-[500]">Laptop</td>
                      <td class="px-6 py-4  font-[500]">$2999</td>
                    </tr>{" "}
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td class="px-6 py-4 font-[500]">Silver</td>
                      <td class="px-6 py-4  font-[500]">Silver</td>
                      <td class="px-6 py-4  font-[500]">Laptop</td>
                      <td class="px-6 py-4  font-[500]">$2999</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div
              className="shadow-md w-full py-5 px-8 rounded-md
            "
            >
              <div className=" w-[80%] productReviewsContainer">
                <h2 className="text-[18px]">Customer question & answer</h2>
                <div className="reviewScroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden mt-5 pr-5">
                  <div className="review pb-5 pt-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img
                          src="https://media.istockphoto.com/id/2164034650/photo/close-up-individual-portrait-of-handsome-serious-guy-looking-at-camera-standing-outdoors.webp?a=1&b=1&s=612x612&w=0&k=20&c=hk9mOu0nE9dGlE2lNqD2p-xMJeVgfm0oBwTJGZn_58E="
                          alt=""
                          className="w-full  h-[80px] "
                        />
                      </div>

                      <div className="w-[80%] ">
                        <h4 className="text-[16px] ">Ayalk Teketel</h4>
                        <h5 className="text-[13px] mb-0">2025-12-3</h5>
                        <p className="mt-0 mb-0">
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          fug dolorem quibusdam voluptas praesentium
                          reprehenderit ducimus tempore pariatur?
                        </p>
                      </div>
                    </div>
                    <Rating name="size-small" defaultValue={5} readOnly />
                  </div>{" "}
                  <div className="review pb-5 pt-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img
                          src="https://media.istockphoto.com/id/2164034650/photo/close-up-individual-portrait-of-handsome-serious-guy-looking-at-camera-standing-outdoors.webp?a=1&b=1&s=612x612&w=0&k=20&c=hk9mOu0nE9dGlE2lNqD2p-xMJeVgfm0oBwTJGZn_58E="
                          alt=""
                          className="w-full  h-[80px] "
                        />
                      </div>

                      <div className="w-[80%] ">
                        <h4 className="text-[16px] ">Ayalk Teketel</h4>
                        <h5 className="text-[13px] mb-0">2025-12-3</h5>
                        <p className="mt-0 mb-0">
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          fug dolorem quibusdam voluptas praesentium
                          reprehenderit ducimus tempore pariatur?
                        </p>
                      </div>
                    </div>
                    <Rating name="size-small" defaultValue={5} readOnly />
                  </div>
                </div>

                <br />

                <div className="reviewForm br-[#fafafa] p-4 rounded-md">
                  <h2 className="text-[18px]">Add a review</h2>
                  <form className="w-full mt-5">
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Write a review..."
                      multiline
                      rows={4}
                      className="w-full"
                    />
                    <br />
                    <br />
                    <Rating name="size-small" defaultValue={5} readOnly />

                    <div className="flex items-center mt-5">
                      <Button className="btn-org"> Submit Review</Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="container pt-8">
          <h2 className="text-[20px] font-[600] pb-0">Related Products</h2>
          <ProductsSlider items={6} />
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
