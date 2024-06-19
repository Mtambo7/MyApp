import { gql, useMutation } from "@apollo/client";

const endpoint =
  "https://api-ap-south-1.hygraph.com/v2/clwzxv6le02jd07w8i446tmar/master";
const SLIDES_QUERY = `
  query GetSliders {
    sliders {
      id
      name
      image {
        url
      }
    }
  }
`;

const CATEGORY_QUERY = ` 
query GetCategory {
  categoryS {
    id
    name
    icon {
      url 
    }
  }
}
`;

const EXPERT_QUARY = ` 
query GetExperts {
  experts {
    id
    name
    email
    about
    address
    contact
    categoryS {
      name
    }
    image {
      url
    }
  }
}`;

const getExpertsByCategory = (category: any) => {
  const SEARCHBYCATEGORY_QUARY = `
    query GetExperts {
      experts(where: { categoryS_some: { name: "${category}"} }) {
        id
        name
        email
        about
        address
        contact
        categoryS {
          name
        }
        image {
          url
        }
      }
    }
  `;
  return SEARCHBYCATEGORY_QUARY;
};


const CREATE_BOOKING = gql`
mutation CreateBooking($data: BookingCreateInput!) {
  createBooking(data: $data) {
    id
  }
  publishManyBookings {
    count
  }
}
`;

export {
  SLIDES_QUERY,
  CATEGORY_QUERY,
  endpoint,
  EXPERT_QUARY,
  getExpertsByCategory,
  CREATE_BOOKING
};
