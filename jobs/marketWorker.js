import getLatestListing from "../utils/getLatestListing.js";

async function marketWorker() {
  const data = await getLatestListing();
  console.log(data);
}

export default marketWorker;