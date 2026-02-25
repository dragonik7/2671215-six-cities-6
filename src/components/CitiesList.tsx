import {useDispatch, useSelector} from 'react-redux';
import {setCity} from '../store/reducer';
import {RootState} from '../store';

export interface CitiesListProps {
  cities: string[];
}
function CitiesList({cities}: CitiesListProps): JSX.Element {
  const dispatch = useDispatch();
  const currentCity = useSelector((state: RootState) => state.app.city);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={city}>
            <a
              className={`locations__item-link tabs__item${currentCity === city ? ' tabs__item--active' : ''}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setCity(city));
              }}
            >
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default CitiesList;
